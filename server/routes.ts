// import type { Express } from "express";
// import { createServer, type Server } from "http";
// import { storage } from "./storage";
// import { insertCheckSchema } from "@shared/schema";
// import { ZodError } from "zod";
// import { fromZodError } from "zod-validation-error";
// import { pool } from "./db";

// export async function registerRoutes(app: Express): Promise<Server> {
//   // Get all checks
//   app.get("/api/checks", async (_req, res) => {
//     try {
//       const checks = await storage.getAllChecks();
//       res.json(checks);
//     } catch (error) {
//       console.error("Error fetching checks:", error);
//       res.status(500).json({ message: "Failed to retrieve checks" });
//     }
//   });

//   // Get a specific check
//   app.get("/api/checks/:id", async (req, res) => {
//     const id = Number(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ message: "Invalid check ID" });
//     }

//     try {
//       const check = await storage.getCheck(id);
//       if (!check) {
//         return res.status(404).json({ message: "Check not found" });
//       }
//       res.json(check);
//     } catch (error) {
//       console.error(`Error fetching check ${id}:`, error);
//       res.status(500).json({ message: "Failed to retrieve check" });
//     }
//   });

//   // Create a new check
//   app.post("/api/checks", async (req, res) => {
//     try {
//       const checkData = insertCheckSchema.parse(req.body);
//       const newCheck = await storage.createCheck(checkData);
//       res.status(201).json(newCheck);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const validationError = fromZodError(error);
//         return res.status(400).json({ message: validationError.message });
//       }
//       console.error("Error creating check:", error);
//       res.status(500).json({ message: "Failed to create check" });
//     }
//   });

//   // Update a check
//   app.put("/api/checks/:id", async (req, res) => {
//     const id = Number(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ message: "Invalid check ID" });
//     }

//     try {
//       const checkData = insertCheckSchema.parse(req.body);
//       const updatedCheck = await storage.updateCheck(id, checkData);
//       if (!updatedCheck) {
//         return res.status(404).json({ message: "Check not found" });
//       }
//       res.json(updatedCheck);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const validationError = fromZodError(error);
//         return res.status(400).json({ message: validationError.message });
//       }
//       console.error(`Error updating check ${id}:`, error);
//       res.status(500).json({ message: "Failed to update check" });
//     }
//   });

//   // Delete a check
//   app.delete("/api/checks/:id", async (req, res) => {
//     const id = Number(req.params.id);
//     if (isNaN(id)) {
//       return res.status(400).json({ message: "Invalid check ID" });
//     }

//     try {
//       const success = await storage.deleteCheck(id);
//       if (!success) {
//         return res.status(404).json({ message: "Check not found" });
//       }
//       res.status(204).send();
//     } catch (error) {
//       console.error(`Error deleting check ${id}:`, error);
//       res.status(500).json({ message: "Failed to delete check" });
//     }
//   });

//   const httpServer = createServer(app);
//   return httpServer;
// }

import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertCheckSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { pool } from "./db";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // GET all checks
  app.get("/api/checks", async (_req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM checks");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching checks:", error);
      res.status(500).json({ message: "Failed to retrieve checks" });
    }
  });

  // GET a specific check
  app.get("/api/checks/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid check ID" });
    }
    try {
      const [rows]: any = await pool.query("SELECT * FROM checks WHERE id = ?", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Check not found" });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error(`Error fetching check ${id}:`, error);
      res.status(500).json({ message: "Failed to retrieve check" });
    }
  });

  // POST create a new check
  app.post("/api/checks", async (req, res) => {
    try {
      const checkData = insertCheckSchema.parse(req.body);
      const { name, amount } = checkData;

      const [result]: any = await pool.query(
        "INSERT INTO checks (name, amount) VALUES (?, ?)",
        [name, amount]
      );

      res.status(201).json({ id: result.insertId, name, amount });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating check:", error);
      res.status(500).json({ message: "Failed to create check" });
    }
  });

  // PUT update a check
  app.put("/api/checks/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid check ID" });
    }
    try {
      const checkData = insertCheckSchema.parse(req.body);
      const { name, amount } = checkData;

      const [result]: any = await pool.query(
        "UPDATE checks SET name = ?, amount = ? WHERE id = ?",
        [name, amount, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Check not found" });
      }

      res.json({ id, name, amount });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error(`Error updating check ${id}:`, error);
      res.status(500).json({ message: "Failed to update check" });
    }
  });

  // DELETE a check
  app.delete("/api/checks/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid check ID" });
    }
    try {
      const [result]: any = await pool.query(
        "DELETE FROM checks WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Check not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting check ${id}:`, error);
      res.status(500).json({ message: "Failed to delete check" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
