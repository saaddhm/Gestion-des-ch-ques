import { useMemo } from "react";
import createBankTemplate from "@/lib/bankTemplates";

interface BankCheckProps {
  bank: string;
  beneficiary: string;
  amount: number;
  amountInFrench: string;
  place: string;
  date: string;
  marginTop: number;
  marginLeft: number;
}

const BankCheck = ({
  bank,
  beneficiary,
  amount,
  amountInFrench,
  place,
  date,
  marginTop,
  marginLeft
}: BankCheckProps) => {
  const template = useMemo(() => createBankTemplate(bank), [bank]);
  
  // Format amount with thousand separators
  const formattedAmount = new Intl.NumberFormat('fr-MA', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(amount);

  // Format date from ISO to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div 
      className="relative w-full h-full p-4"
      style={{ 
        backgroundColor: template.background,
        color: template.textColor,
        marginTop: `${marginTop}mm`,
        marginLeft: `${marginLeft}mm` 
      }}
    >
      {/* Bank logo and info */}
      <div className="absolute top-2 left-2">
        <div className="text-sm font-bold">
          <img src={template.logo} alt={template.name} className="w-50 h-10" />
        </div>
        <div className="text-xs font-semibold">{template.name}</div>
        <div className="text-[10px] text-gray-500">Agence: Casablanca - Maarif</div>
      </div>
      
      {/* Check number */}
      <div className="absolute top-2 right-2 text-xs font-mono">N° 1234567</div>
      
      {/* Pay to */}
      <div 
        className="absolute right-[40px]"
        style={{ 
          top: template.beneficiaryPosition.top,
          left: template.beneficiaryPosition.left
        }}
      >
        <div className="text-xs mb-1">Payez contre ce chèque à</div>
        <div className="border-b border-gray-400 pb-1 text-sm font-medium min-w-[200px]">
          {beneficiary || ""}
        </div>
      </div>
      
      {/* Amount in numbers */}
      <div 
        className="absolute"
        style={{ 
          top: template.amountPosition.top,
          right: template.amountPosition.right
        }}
      >
        <div className="border border-gray-400 rounded px-2 py-1 inline-block text-center">
          <span className="text-base font-bold">{formattedAmount}</span>
          <span className="text-xs">DH</span>
        </div>
      </div>
      
      {/* Amount in words */}
      <div 
        className="absolute right-[40px]"
        style={{ 
          top: template.amountWordsPosition.top,
          left: template.amountWordsPosition.left
        }}
      >
        <div className="border-b border-gray-400 pb-1 text-sm min-w-[200px]">
          {amountInFrench}
        </div>
      </div>
      
      {/* Place and date */}
      <div 
        className="absolute text-sm"
        style={{ 
          bottom: template.placeAndDatePosition.bottom,
          right: template.placeAndDatePosition.right
        }}
      >
        <span>{place || ""}</span>
        {place && ", "}
        le <span>{formatDate(date)}</span>
      </div>
      
      {/* Signature area */}
      <div 
        className="absolute border-b border-gray-300 w-[100px]"
        style={{ 
          bottom: template.signaturePosition.bottom,
          right: template.signaturePosition.right
        }}
      >
        <div className="text-xs text-center">Signature</div>
      </div>
    </div>
  );
};

export default BankCheck;
