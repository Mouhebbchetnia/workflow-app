import express from "express";
import Workflow from "../models/Workflow.js";
import User from "../models/User.js";

const router = express.Router();

// Récupérer les statistiques
router.get("/", async (req, res) => {
  try {
    const totalWorkflows = await Workflow.count();
    const activeUsers = await User.count();
    const recentActivity = "Workflow modifié récemment"; // À implémenter selon tes besoins

    res.json({
      totalWorkflows,
      activeUsers,
      recentActivity,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des stats :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;