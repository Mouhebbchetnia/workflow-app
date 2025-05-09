import Workflow from "../models/Workflow.js";

export const createWorkflow = async (req, res) => {
  const { name, description, elements } = req.body;
  const userId = req.user.userId;
  try {
    const workflow = await Workflow.create({
      name,
      description,
      elements,
      userId,
    });
    res.status(201).json({ message: "Workflow créé avec succès", workflow });
  } catch (error) {
    console.error("Erreur dans createWorkflow:", error);
    res.status(500).json({ error: "Erreur lors de la création du workflow." });
  }
};

export const getUserWorkflows = async (req, res) => {
  const userId = req.user.userId;
  try {
    const workflows = await Workflow.findAll({ where: { userId } });
    res.json({ message: "Workflows récupérés avec succès", workflows });
  } catch (error) {
    console.error("Erreur dans getUserWorkflows:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des workflows." });
  }
};

export const executeWorkflow = async (req, res) => {
  const { id } = req.params; // ID du workflow à exécuter
  const userId = req.user.userId;
  try {
    const workflow = await Workflow.findOne({ where: { id, userId } });
    if (!workflow) {
      return res.status(404).json({ error: "Workflow non trouvé." });
    }
    // Logique simplifiée d'exécution (simulation)
    console.log(`Exécution du workflow ${workflow.name} pour l'utilisateur ${userId}`);
    res.json({ message: "Workflow exécuté avec succès", workflow });
  } catch (error) {
    console.error("Erreur dans executeWorkflow:", error);
    res.status(500).json({ error: "Erreur lors de l'exécution du workflow." });
  }
};