import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Download,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [checkToDelete, setCheckToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: checks, isLoading, isError } = useQuery<Check[]>({
    queryKey: ["/api/checks"],
  });

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("fr-FR").format(new Date(dateString));
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', { minimumFractionDigits: 2 }).format(amount);
  };

  const handleExport = () => {
    if (!filteredChecks || filteredChecks.length === 0) {
      toast({
        title: "Aucun chèque",
        description: "Il n'y a pas de données à exporter.",
        variant: "destructive",
      });
      return;
    }

    const headers = ["Date", "Bénéficiaire", "Montant (MAD)", "Banque"];
    const rows = filteredChecks.map(check => [
      formatDate(check.date),
      check.beneficiary,
      formatAmount(check.amount),
      check.bank,
    ]);

    const csvContent =
      "\uFEFF" +
      [headers, ...rows].map(e => e.map(a => `"${a.replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cheques_export.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exportation réussie",
      description: "Le fichier CSV a été téléchargé.",
    });
  };

  const handleDeleteConfirm = async () => {
    if (checkToDelete === null) return;
    try {
      await apiRequest("DELETE", `/api/checks/${checkToDelete}`);
      queryClient.invalidateQueries({ queryKey: ["/api/checks"] });
      toast({ title: "Supprimé", description: "Le chèque a été supprimé." });
    } catch (error) {
      toast({ title: "Erreur", description: "Erreur lors de la suppression.", variant: "destructive" });
    } finally {
      setDeleteDialogOpen(false);
      setCheckToDelete(null);
    }
  };

  const filteredChecks = checks?.filter(check => {
    const checkDate = new Date(check.date);
    return (
      (check.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      check.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatAmount(check.amount).includes(searchTerm)) &&
      (!startDate || checkDate >= new Date(startDate)) &&
      (!endDate || checkDate <= new Date(endDate))
    );
  });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur chargement données.</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-6">Historique des Chèques</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Input placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
          <Search className="absolute left-2 top-2 text-gray-400 h-5 w-5" />
        </div>

        <div className="flex items-center space-x-2">
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <span>à</span>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <Button variant="outline" onClick={() => { setStartDate(""); setEndDate(""); }}>
            <RefreshCw className="h-4 w-4 mr-1" />Réinitialiser
          </Button>
          <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-1" />Exporter</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Bénéficiaire</TableHead>
            <TableHead>Montant (MAD)</TableHead>
            <TableHead>Banque</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredChecks?.map((check) => (
            <TableRow key={check.id}>
              <TableCell>{formatDate(check.date)}</TableCell>
              <TableCell>{check.beneficiary}</TableCell>
              <TableCell>{formatAmount(check.amount)}</TableCell>
              <TableCell>{check.bank}</TableCell>
              <TableCell>
                <Link href={`/editer-check/${check.id}`}><Pencil className="inline h-4 w-4" /></Link>
                <button onClick={() => { setCheckToDelete(check.id); setDeleteDialogOpen(true); }}>
                  <Trash2 className="inline h-4 w-4 text-red-500" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer suppression</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default History;