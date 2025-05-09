import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/users/register", { username, email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Échec de l'inscription. Vérifiez vos informations.";
      setError(errorMessage);
      console.error("Register error:", err);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#1a1a1a" }}>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <h1>Workflow App</h1>
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
            style={{ padding: "10px", borderRadius: "5px", border: "none" }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ padding: "10px", borderRadius: "5px", border: "none" }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            style={{ padding: "10px", borderRadius: "5px", border: "none" }}
          />
          <button type="submit" style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#333", color: "#fff", cursor: "pointer" }}>
            S'inscrire
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>
            Déjà un compte ? <a href="/login" style={{ color: "#007bff" }}>Se connecter</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;