import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Check, banks } from "@shared/schema";
import { convertToFrenchWords, convertToArabicWords } from "@/lib/numberToWords";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { SaveIcon, PrinterIcon, RefreshCw } from "lucide-react";

interface CheckFormProps {
  data: Partial<Check>;
  onChange: (data: Partial<Check>) => void;
  onSave: () => void;
  onReset: () => void;
  saveButtonLabel?: string;
}

const CheckForm = ({ data, onChange, onSave, onReset, saveButtonLabel }: CheckFormProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Cheque",
    onBeforeGetContent: () => {
      if (!printRef.current) {
        alert("La zone à imprimer n'est pas prête.");
        return Promise.reject();
      }
      return Promise.resolve();
    },
    removeAfterPrint: true,
    suppressErrors: true,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `
  } as any);

  useEffect(() => {
    if (data.amount !== undefined) {
      const frenchWords = convertToFrenchWords(data.amount);
      const arabicWords = convertToArabicWords(data.amount);
      onChange({
        amountInFrench: frenchWords,
        amountInArabic: arabicWords,
      });
    }
  }, [data.amount, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    onChange({
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSelectChange = (value: string) => {
    onChange({ bank: value });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md space-y-8">
      <div ref={printRef} className="space-y-6 border p-6 rounded bg-gray-50 print:p-0 print:border-0">
        <h2 className="text-xl font-bold mb-4">Informations du Chèque</h2>

        <div>
          <Label htmlFor="bank">Banque</Label>
          <Select value={data.bank || "attijariwafa"} onValueChange={handleSelectChange}>
            <SelectTrigger id="bank" className="w-full">
              <SelectValue placeholder="Sélectionner une banque" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="beneficiary">Bénéficiaire</Label>
          <Input
            id="beneficiary"
            name="beneficiary"
            type="text"
            value={data.beneficiary || ""}
            onChange={handleInputChange}
            placeholder="Nom complet du bénéficiaire"
          />
        </div>

        <div>
          <Label htmlFor="amount">Montant (MAD)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={data.amount || ""}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          <div className="mt-2 text-sm">
            <p>Montant en lettres (Français) :</p>
            <p className="font-medium">{data.amountInFrench}</p>
            <p className="mt-2">Montant en lettres (Arabe) :</p>
            <p dir="rtl" className="font-arabic font-medium">{data.amountInArabic}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="place">Lieu</Label>
            <Input
              id="place"
              name="place"
              type="text"
              value={data.place || ""}
              onChange={handleInputChange}
              placeholder="ex: Casablanca"
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={data.date || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 print:hidden">
        <Button onClick={onSave} className="bg-primary hover:bg-primary-600">
          <SaveIcon className="h-4 w-4 mr-2" />
          {saveButtonLabel || "Sauvegarder"}
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Réinitialiser
        </Button>
      </div>
    </div>
  );
};

export default CheckForm;