import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Dashboard = () => {
  const [workflows, setWorkflows] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await api.get("/workflows");
        setWorkflows(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des workflows.");
        console.error("Fetch workflows error:", err);
      }
    };
    fetchWorkflows();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#1a1a1a", minHeight: "100vh", color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Workflow App - Tableau de Bord</h1>
        <button
          onClick={handleLogout}
          style={{ padding: "10px 20px", backgroundColor: "#ff4444", color: "#fff", borderRadius: "5px", border: "none", cursor: "pointer" }}
        >
          Se déconnecter
        </button>
      </div>
      <div style={{ margin: "20px 0" }}>
        <Link
          to="/create"
          style={{ display: "inline-block", padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px", textDecoration: "none", marginRight: "10px" }}
        >
          Créer un Workflow
        </Link>
        <button
          onClick={() => alert("Fonction d'import/export à implémenter")}
          style={{ padding: "10px 20px", backgroundColor: "#666", color: "#fff", borderRadius: "5px", border: "none", marginRight: "10px", cursor: "pointer" }}
        >
          Importer/Exporter
        </button>
        <Link
          to="/stats"
          style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px", textDecoration: "none", marginRight: "10px" }}
        >
          Statistiques
        </Link>
        <Link
          to="/notifications"
          style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px", textDecoration: "none", marginRight: "10px" }}
        >
          Notifications
        </Link>
        <Link
          to="/admin/users"
          style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px", textDecoration: "none" }}
        >
          Gestion des Utilisateurs
        </Link>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {workflows.length === 0 ? (
        <p>Aucun workflow disponible. Créez-en un pour commencer !</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {workflows.map((workflow) => (
            <li
              key={workflow.id}
              style={{ padding: "10px", backgroundColor: "#333", margin: "10px 0", borderRadius: "5px" }}
            >
              {workflow.name} <Link to={`/editor/${workflow.id}`}>Éditer</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;