import { Link, useLocation } from "wouter";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button"; // Tu utilises ton bouton déjà stylé

const Header = () => {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Supprimer le user connecté
    setLocation("./"); // Rediriger vers page de login
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/home">
          <h1 className="text-2xl font-semibold flex items-center cursor-pointer" style={{ color: "dark" }}>
            {/* <DollarSign className="mr-2 h-6 w-6" /> */}
            Gestion des chèques
          </h1>
        </Link>

        {user && ( // 👈 Afficher la navigation seulement si connecté
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link href="/home">
                  <a className="text-neutral font-medium transition">Accueil</a>
                </Link>
              </li>
              <li>
                <Link href="/history">
                  <a className="text-neutral font-medium transition">Historique</a>
                </Link>
              </li>
              <li>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-500 hover:bg-red-50"
                >
                  Déconnexion
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
