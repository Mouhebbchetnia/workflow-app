import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Workflow from "./Workflow.js";

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
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
  workflowId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Workflow,
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Notification.belongsTo(User, { foreignKey: "userId" });
Notification.belongsTo(Workflow, { foreignKey: "workflowId" });

export { Notification };