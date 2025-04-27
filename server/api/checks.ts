import { type Request, type Response, Router } from "express";
import { pool } from "../db"; // adapte le chemin selon ton projet
import { insertCheckSchema } from "@shared/schema"; // ton schéma Zod
import { ZodError } from "zod";

const router = Router();

// POST /api/checks - Créer un nouveau chèque
router.post("/", async (req: Request, res: Response) => {
  try {
    // Valider le body
    const validated = insertCheckSchema.parse(req.body);

    const { bank, beneficiary, amount, amountInFrench, amountInArabic, place, date } = validated;

    const [result]: any = await pool.query(
      "INSERT INTO checks (bank, beneficiary, amount, amountInFrench, amountInArabic, place, date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [bank, beneficiary, amount, amountInFrench, amountInArabic, place, date]
    );

    return res.status(201).json({ id: result.insertId, message: "Chèque créé avec succès" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Validation error", details: error.errors });
    }

    console.error("Erreur API /api/checks:", error);
    return res.status(500).json({ message: "Erreur serveur pendant l'insertion du chèque" });
  }
});

// (optionnel) GET pour tester
router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM checks ORDER BY id DESC");
    return res.json(rows);
  } catch (error) {
    console.error("Erreur API GET /api/checks:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});



router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
  
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }
  
    try {
      // Valider les données envoyées
      const validated = insertCheckSchema.parse(req.body);
  
      const { bank, beneficiary, amount, amountInFrench, amountInArabic, place, date } = validated;
  
      const [result]: any = await pool.query(
        `UPDATE checks 
         SET bank = ?, beneficiary = ?, amount = ?, amountInFrench = ?, amountInArabic = ?, place = ?, date = ?
         WHERE id = ?`,
        [bank, beneficiary, amount, amountInFrench, amountInArabic, place, date, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Chèque non trouvé" });
      }
  
      res.json({ message: "Chèque modifié avec succès", id });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Erreur de validation", details: error.errors });
      }
  
      console.error(`Erreur API PUT /api/checks/${id}:`, error);
      res.status(500).json({ message: "Erreur serveur pendant la modification" });
    }
  });

export default router;
