// src/components/CreateWorkflowForm.jsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import "../styles.css";

const CreateWorkflowForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      setError("Le nom doit contenir au moins 3 caractères.");
      return;
    }
    try {
      await api.post("/api/workflows", { name, description });
      setError("");
      history.push("/");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la création du workflow");
    }
  };

  return (
    <div className="container">
      <h2>Créer un Workflow</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div>
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="button">
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateWorkflowForm;