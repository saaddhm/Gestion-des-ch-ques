import { Router } from "express";
import { pool } from "../db";

const router = Router();

// POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Données reçues du frontend :", { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  try {
    const [rows]: any = await pool.query("SELECT * FROM auth WHERE email = ?", [email]);

    console.log("Résultat de la base :", rows);

    if (rows.length === 0) {
      console.log("Aucun utilisateur trouvé avec cet email !");
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const user = rows[0];

    // console.log("Comparaison password :", password, "vs", user.password);

    if (password !== user.password) {
      console.log("Mot de passe incorrect !");
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    console.log("Connexion réussie !");
    return res.json({ message: "Connexion réussie", userId: user.id, email: user.email });

  } catch (error) {
    console.error("Erreur login :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
