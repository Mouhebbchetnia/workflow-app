import sequelize from "./config/database.js";
import User from "./models/User.js";
import Workflow from "./models/Workflow.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Base de données synchronisée");

    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.create({
      username: "mouheb",
      email: "mouheb@example.com",
      password: hashedPassword,
    });
    console.log("Utilisateur ajouté avec succès !");

    await Workflow.bulkCreate([
      { name: "Workflow1", description: "Premier workflow" },
      { name: "workflowSZ", description: "Workflow SZ" },
      { name: "workflowS", description: "Workflow S" },
      { name: "myWorkflow", description: "Mon workflow" },
      { name: "sonedWorkflow", description: "Workflow SONED" },
    ]);
    console.log("Workflows ajoutés avec succès !");

    await sequelize.close();
  } catch (error) {
    console.error("Erreur lors de l’ajout des données:", error);
    await sequelize.close();
  }
};

seedData();
