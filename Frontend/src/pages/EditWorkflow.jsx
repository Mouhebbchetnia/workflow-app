import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWorkflow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSave = () => {
    // Logique pour sauvegarder les modifications
    navigate("/"); // Redirige vers la liste des workflows après sauvegarde
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Modifier le Workflow {id}</h2>
      <button onClick={handleSave}>Sauvegarder</button>
    </div>
  );
};

export default EditWorkflow;