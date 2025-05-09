import express from "express";
import { Notification } from "../models/Index.js";

const router = express.Router();

// Récupérer toutes les notifications pour un utilisateur
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: 1 }, // À ajuster avec l'ID de l'utilisateur authentifié
    });
    res.json(notifications);
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;