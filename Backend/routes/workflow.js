import express from "express";
import Workflow from "../models/Workflow.js";

const router = express.Router();

// Récupérer tous les workflows
router.get("/", async (req, res) => {
  try {
    const workflows = await Workflow.findAll();
    res.json(workflows);
  } catch (error) {
    console.error("Erreur lors de la récupération des workflows :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Créer un workflow
router.post("/", async (req, res) => {
  const { name, data } = req.body; // Remplace 'xml' par 'data'
  try {
    const userId = 1; // À remplacer par l'ID de l'utilisateur authentifié
    const workflow = await Workflow.create({ name, data, userId });
    res.status(201).json({ message: "Workflow créé avec succès", workflow });
  } catch (error) {
    console.error("Erreur lors de la création du workflow :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

export default router;