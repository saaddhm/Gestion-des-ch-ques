import { forwardRef, useState } from "react";
import { Check } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ZoomIn, ZoomOut } from "lucide-react";
import BankCheck from "@/components/BankCheck";

interface CheckPreviewProps {
  data: Partial<Check>;
}

const CheckPreview = forwardRef<HTMLDivElement, CheckPreviewProps>(({ data }, ref) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Aperçu du Chèque</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-3.5 w-3.5 mr-1" /> Zoom +
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-3.5 w-3.5 mr-1" /> Zoom -
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="relative border border-gray-300 rounded-md overflow-hidden"
          style={{ height: "260px", backgroundColor: "#FAFBFC" }}
        >
          <div 
            id="checkToPrint"
            ref={ref}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              transition: 'transform 0.2s ease-in-out',
              width: "100%",
              height: "100%"
            }}
          >
            <BankCheck 
              bank={data.bank || "attijariwafa"}
              beneficiary={data.beneficiary || ""}
              amount={data.amount || 0}
              amountInFrench={data.amountInFrench || ""}
              place={data.place || ""}
              date={data.date || ""}
              marginTop={data.marginTop || 0}
              marginLeft={data.marginLeft || 0}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CheckPreview.displayName = "CheckPreview";

export default CheckPreview;
