import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import workflowRoutes from "./routes/workflow.js";
import notificationRoutes from "./routes/notification.js";
import statsRoutes from "./routes/stats.js";
import sequelize from "./config/database.js";
import User from "./models/User.js";
import Workflow from "./models/Workflow.js";
import { Notification } from "./models/Index.js";
import bcrypt from "bcryptjs";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route racine
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API de Workflow App" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/workflows", workflowRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/stats", statsRoutes);

// Synchronisation des modèles avec la base de données
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Désactive les modifications automatiques
    console.log("Base de données synchronisée avec succès.");

    // Ajouter un utilisateur de test
    const existingUser = await User.findOne({ where: { email: "admin@test.com" } });
    let user;
    if (!existingUser) {
      user = await User.create({
        username: "admin_test",
        email: "admin@test.com",
        password: await bcrypt.hash("password123", 10),
      });
      console.log("Utilisateur de test créé avec succès.");
    } else {
      user = existingUser;
      console.log("Utilisateur de test déjà existant.");
    }

    // Ajouter un workflow de test
    const workflowData = {
      nodes: [{ id: "start-1", type: "bpmnStartNode", position: { x: 0, y: 0 }, data: { label: "Début" } }],
      edges: [],
    };
    const workflow = await Workflow.create({
      name: "Workflow Test",
      data: JSON.stringify(workflowData),
      userId: user.id,
    });
    console.log("Workflow de test créé avec succès.");

    // Ajouter une notification de test
    await Notification.create({
      message: "Nouveau workflow créé",
      userId: user.id,
      workflowId: workflow.id,
      createdAt: new Date(),
    });
    console.log("Notification de test créée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la synchronisation de la base de données:", error);
    process.exit(1);
  }
};

// Démarrer le serveur après synchronisation
syncDatabase().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});