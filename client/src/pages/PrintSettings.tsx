import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const PrintSettings = () => {
  return (
    <div className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuration d'Impression</CardTitle>
          <CardDescription>
            Conseils et paramètres pour une impression précise des chèques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-3">Conseils pour l'impression</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li>Désactivez les marges d'impression dans les paramètres de votre navigateur</li>
              <li>Utilisez l'aperçu avant impression pour vérifier l'alignement</li>
              <li>Configurez l'imprimante en mode "Échelle 100%" (pas d'ajustement automatique)</li>
              <li>Pour une meilleure précision, utilisez une imprimante laser</li>
              <li>Placez le chèque vierge dans le bac d'alimentation avec précaution</li>
              <li>Faites des tests sur du papier ordinaire avant d'utiliser des chèques réels</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-medium mb-3">Paramètres du navigateur</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">Chrome</h4>
                <p className="text-sm text-gray-600">
                  Menu → Imprimer → Plus de paramètres → Marges → Aucune
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Firefox</h4>
                <p className="text-sm text-gray-600">
                  Menu → Imprimer → Configuration de la page → Marges et En-tête/Pied de page → Définir toutes les marges à 0
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Safari</h4>
                <p className="text-sm text-gray-600">
                  Fichier → Mise en page → Définir toutes les marges à 0
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Edge</h4>
                <p className="text-sm text-gray-600">
                  Menu → Imprimer → Plus de paramètres → Marges → Aucune
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-medium mb-3">Problèmes courants</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Décalage lors de l'impression</h4>
                <p className="text-sm text-gray-600">
                  Ajustez les marges dans l'interface de réglage d'impression sur la page principale.
                  Vous pouvez utiliser des valeurs négatives pour décaler dans la direction opposée.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">L'impression est trop petite/grande</h4>
                <p className="text-sm text-gray-600">
                  Assurez-vous que l'échelle d'impression est réglée à 100% dans les paramètres d'impression du navigateur.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Le texte arabe ne s'imprime pas correctement</h4>
                <p className="text-sm text-gray-600">
                  Vérifiez que la police Amiri est correctement installée sur votre système ou utilisez les polices de secours.
                </p>
              </div>
            </div>
          </section>

          <Alert variant="info" className="mt-6 bg-blue-50 border-blue-100">
            <InfoIcon className="h-4 w-4 text-blue-800" />
            <AlertTitle className="text-blue-800">Note importante</AlertTitle>
            <AlertDescription className="text-blue-700 text-sm">
              Pour une précision maximale, imprimez toujours un test sur papier ordinaire avant
              d'utiliser un chèque réel. Superposez le test sur le chèque vierge à la lumière pour
              vérifier l'alignement.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrintSettings;
