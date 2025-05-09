import React, { useState } from "react";
import api from "../services/api";

const WorkflowImportExport = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      await api.post("/workflows/import", formData);
      setSuccess("Workflow importé avec succès !");
      setError("");
    } catch (err) {
      setError("Erreur lors de l'importation : " + (err.response?.data?.message || err.message));
      console.error("Import error:", err);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get("/workflows/export", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "workflows.xml");
      document.body.appendChild(link);
      link.click();
      setSuccess("Workflow exporté avec succès !");
      setError("");
    } catch (err) {
      setError("Erreur lors de l'exportation : " + (err.response?.data?.message || err.message));
      console.error("Export error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Importer/Exporter des Workflows</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div>
        <h3>Importer un Workflow</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleImport} style={{ marginLeft: "10px" }}>
          Importer
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Exporter tous les Workflows</h3>
        <button onClick={handleExport}>Exporter</button>
      </div>
    </div>
  );
};

export default WorkflowImportExport;