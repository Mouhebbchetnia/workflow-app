import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await api.get("/workflows");
        setWorkflows(response.data);
        setError("");
      } catch (err) {
        setError("Erreur lors du chargement des workflows : " + (err.response?.data?.message || err.message));
        console.error("Fetch workflows error:", err);
      }
    };
    fetchWorkflows();
  }, []);

  const handleViewEditor = (id) => {
    navigate(`/workflows/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Liste des Workflows</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {workflows.length === 0 && !error ? (
        <p>Aucun workflow disponible.</p>
      ) : (
        <ul>
          {workflows.map((workflow) => (
            <li key={workflow.id}>
              {workflow.name || "Workflow sans nom"}
              <button onClick={() => handleViewEditor(workflow.id)} style={{ marginLeft: "10px" }}>
                Modifier
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/editor")} style={{ marginTop: "10px" }}>
        Créer un nouveau workflow
      </button>
    </div>
  );
};

export default WorkflowList;