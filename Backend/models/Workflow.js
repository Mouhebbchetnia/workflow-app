import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Workflow = sequelize.define("Workflow", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: { // Remplace 'xml' par 'data'
    type: DataTypes.JSON, // Utilise JSON pour stocker les nodes et edges
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

Workflow.belongsTo(User, { foreignKey: "userId" });

// Synchronise le modèle avec la base de données
(async () => {
  try {
    await sequelize.sync({ alter: true }); // alter: true met à jour la table si nécessaire
    console.log("Modèle Workflow synchronisé avec la base de données.");
  } catch (error) {
    console.error("Erreur lors de la synchronisation du modèle Workflow :", error);
  }
})();

export default Workflow;