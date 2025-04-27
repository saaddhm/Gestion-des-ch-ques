import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Check } from "@shared/schema";
import CheckForm from "@/components/CheckForm";
import { toast } from "@/hooks/use-toast";

const EditCheckPage = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useLocation();
  const [formData, setFormData] = useState<Partial<Check>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/checks/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erreur serveur");
          }
          return res.json();
        })
        .then((data) => {
          setFormData({
            ...data,
            amount: data.amount ? Number(data.amount) : 0, // Assurer que amount est bien un number
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur chargement du chèque:", error);
          toast({
            title: "Erreur",
            description: "Impossible de charger le chèque.",
            variant: "destructive",
          });
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (updatedData: Partial<Check>) => {
    setFormData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/checks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la modification.");
      }

      toast({
        title: "Succès",
        description: "Chèque modifié avec succès.",
      });

      setLocation("/history"); // Rediriger après succès
    } catch (error: any) {
      console.error("Erreur modification:", error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur inconnue",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    // Recharger les données initiales ?
    setFormData({});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Chargement du chèque...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Modifier le Chèque</h1>
      <CheckForm
        data={formData}
        onChange={handleChange}
        onSave={handleSave}
       
        onReset={handleReset}
        saveButtonLabel="Modifier" // 👈 Affiche Modifier au lieu de Sauvegarder
      />
    </div>
  );
};

export default EditCheckPage;
