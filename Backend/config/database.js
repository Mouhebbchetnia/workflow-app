import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite:./database.sqlite");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données SQLite établie avec succès.");
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
  }
})();

export default sequelize;