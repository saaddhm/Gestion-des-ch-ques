import { useState, useRef } from "react";
import CheckForm from "@/components/CheckForm";
import CheckPreview from "@/components/CheckPreview";
import MarginSettings from "@/components/MarginSettings";
import { Check } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useReactToPrint } from "react-to-print";

const Home = () => {
  const [checkData, setCheckData] = useState<Partial<Check>>({
    beneficiary: "",
    amount: 0,
    amountInFrench: "Zéro dirhams",
    amountInArabic: "صفر درهم",
    place: "",
    date: new Date().toISOString().split('T')[0],
    bank: "attijariwafa",
    marginTop: 0,
    marginLeft: 0
  });
  
  const checkPreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleCheckFormChange = (data: Partial<Check>) => {
    setCheckData({ ...checkData, ...data });
  };

  const handleMarginChange = (marginTop: number, marginLeft: number) => {
    setCheckData({ ...checkData, marginTop, marginLeft });
  };

  const handleSaveCheck = async () => {
    try {
      const newCheck = {
        beneficiary: checkData.beneficiary || "",
        amount: checkData.amount || 0,
        amountInFrench: checkData.amountInFrench || "",
        amountInArabic: checkData.amountInArabic || "",
        place: checkData.place || "",
        date: checkData.date || "",
        bank: checkData.bank || "attijariwafa",
        marginTop: checkData.marginTop || 0,
        marginLeft: checkData.marginLeft || 0
      };

      await apiRequest("POST", "/api/checks", newCheck);
      await queryClient.invalidateQueries({ queryKey: ["/api/checks"] });
      
      toast({ 
        title: "Succès",
        description: "Le chèque a été sauvegardé avec succès!",
        variant: "default"
      });
    } catch (error) {
      toast({ 
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde du chèque.",
        variant: "destructive"
      });
      console.error(error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => checkPreviewRef.current,
    documentTitle: `Chèque_${checkData.beneficiary}`,
    onBeforePrint: () => {
      console.log("Préparation à l'impression...");
    },
    onAfterPrint: () => {
      toast({ 
        title: "Impression terminée",
        description: "Le chèque a été envoyé à l'imprimante.",
      });
    }
  });

  const handleReset = () => {
    setCheckData({
      beneficiary: "",
      amount: 0,
      amountInFrench: "Zéro dirhams",
      amountInArabic: "صفر درهم",
      place: "",
      date: new Date().toISOString().split('T')[0],
      bank: "attijariwafa",
      marginTop: 0,
      marginLeft: 0
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-6">
      <div className="lg:w-1/2">
        <CheckForm 
          data={checkData}
          onChange={handleCheckFormChange}
          onSave={handleSaveCheck}
          onPrint={handlePrint}
          onReset={handleReset}
        />
      </div>
      
      <div className="lg:w-1/2">
        <CheckPreview 
          data={checkData}
          ref={checkPreviewRef}
        />
        
        <div className="mt-6">
          <MarginSettings
            marginTop={checkData.marginTop || 0}
            marginLeft={checkData.marginLeft || 0}
            onChange={handleMarginChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
