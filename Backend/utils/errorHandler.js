// Middleware pour la gestion des erreurs globales
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Affiche l'erreur dans la console
  res.status(500).json({ error: "Something went wrong!" });
};

export default errorHandler;
