import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (error) {
    console.error("Erreur dans registerUser:", error);
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Tentative de connexion avec email:", email);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("Utilisateur non trouvé pour email:", email);
      return res.status(401).json({ error: "Identifiants incorrects." });
    }
    console.log("Utilisateur trouvé:", user.email, "Mot de passe stocké:", user.password);
    if (user.password !== password) {
      console.log("Comparaison échouée - Mot de passe entré:", password);
      return res.status(401).json({ error: "Identifiants incorrects." });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );
    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("Erreur dans login:", error);
    res.status(500).json({ error: "Erreur lors de la connexion." });
  }
};