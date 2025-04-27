import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "@/hooks/use-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur de connexion");
      }

      const data = await response.json();
      console.log("Connexion réussie :", data);

      localStorage.setItem("user", JSON.stringify(data));

      setLocation("/home"); // Rediriger directement au Home ✅

      toast({
        title: "Succès",
        description: "Connexion réussie !",
      });

    } catch (error: any) {
      console.error("Erreur login:", error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur inconnue",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              placeholder="Entrez votre email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
