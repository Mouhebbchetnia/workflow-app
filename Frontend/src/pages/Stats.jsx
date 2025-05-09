import React, { useState, useEffect } from "react";
import api from "../services/api";

const Stats = () => {
  const [stats, setStats] = useState({ totalWorkflows: 0, activeUsers: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/stats");
        setStats(response.data);
        setError("");
      } catch (err) {
        setError("Erreur lors du chargement des statistiques : " + (err.response?.data?.message || err.message));
        console.error("Fetch stats error:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Statistiques</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Nombre total de workflows : {stats.totalWorkflows}</p>
      <p>Utilisateurs actifs : {stats.activeUsers}</p>
    </div>
  );
};

export default Stats;