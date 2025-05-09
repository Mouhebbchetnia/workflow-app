import User from "../models/User.js";

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    await user.destroy();
    res.json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
};