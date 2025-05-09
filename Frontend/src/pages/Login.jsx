import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Échec de la connexion. Vérifiez vos identifiants.";
      setError(errorMessage);
      console.error("Login error:", err);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#1a1a1a" }}>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <h1>Workflow App</h1>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
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
            Se connecter
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>
            Pas de compte ? <a href="/register" style={{ color: "#007bff" }}>Créer un compte</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;