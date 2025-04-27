import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";
import Home from "@/pages/Home";
import History from "@/pages/History";
import PrintSettings from "@/pages/PrintSettings";
import Header from "@/components/Header";
import AppTabs from "@/components/AppTabs";
import EditCheckPage from "@/pages/EditCheckPage";
import PrivateRoute from "@/components/PrivateRoute"; // ✅

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/history" component={History} />
      <PrivateRoute path="/print-settings" component={PrintSettings} />
      <PrivateRoute path="/editer-check/:id" component={EditCheckPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation(); // 👈 Ajouter pour détecter l'url actuelle

  const isLoginPage = location === "/";

  return (
    <TooltipProvider>
      <div className="bg-gray-50 min-h-screen">
        {/* Afficher Header et Tabs seulement si PAS sur /login */}
        {!isLoginPage && (
          <>
            <Header />
            <main className="container mx-auto px-4 py-8">
              <AppTabs />
              <Router />
            </main>
          </>
        )}

        {/* Afficher uniquement le formulaire de login si / */}
        {isLoginPage && (
          <main className="container mx-auto px-4 py-8">
            <Router />
          </main>
        )}
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
