import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarginSettingsProps {
  marginTop: number;
  marginLeft: number;
  onChange: (marginTop: number, marginLeft: number) => void;
}

const MarginSettings = ({
  marginTop,
  marginLeft,
  onChange
}: MarginSettingsProps) => {
  const handleMarginTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onChange(value, marginLeft);
  };

  const handleMarginLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onChange(marginTop, value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Réglages d'Impression</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="margin-top" className="block text-sm text-gray-600 mb-1">
              Marge supérieure (mm)
            </Label>
            <Input
              type="number"
              id="margin-top"
              value={marginTop}
              onChange={handleMarginTopChange}
              min="-20"
              max="20"
              step="0.5"
              className="w-full text-sm"
            />
          </div>
          <div>
            <Label htmlFor="margin-left" className="block text-sm text-gray-600 mb-1">
              Marge gauche (mm)
            </Label>
            <Input
              type="number"
              id="margin-left"
              value={marginLeft}
              onChange={handleMarginLeftChange}
              min="-20"
              max="20"
              step="0.5"
              className="w-full text-sm"
            />
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mb-3">
          Ajustez les marges pour aligner précisément l'impression sur le papier. 
          Les valeurs peuvent être négatives pour décaler dans la direction opposée.
        </p>
        
        <div className="bg-blue-50 p-3 rounded-md border border-blue-100 flex">
          <InfoIcon className="h-5 w-5 text-blue-800 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">Conseils pour l'impression</h4>
            <ul className="text-xs text-blue-700 list-disc list-inside">
              <li>Désactivez les marges d'impression dans les paramètres de votre navigateur</li>
              <li>Utilisez l'aperçu avant impression pour vérifier l'alignement</li>
              <li>Configurez l'imprimante en mode "Échelle 100%" (pas d'ajustement automatique)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarginSettings;
