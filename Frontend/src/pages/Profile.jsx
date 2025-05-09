import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api.js";
import "../styles.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Aucun token trouvé, veuillez vous connecter.");
          history.push("/login");
          return;
        }
        const res = await api.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Erreur lors de la récupération des données.");
        history.push("/login");
      }
    };
    fetchUser();
  }, [history]);

  const handleUpdate = async () => {
    if (!user.username || user.username.length < 3) {
      setError("Le nom d'utilisateur doit contenir au moins 3 caractères.");
      return;
    }
    if (!validateEmail(user.email)) {
      setError("Veuillez entrer un email valide.");
      return;
    }
    try {
      await api.put("/api/auth/me", user);
      setError(null);
      alert("Utilisateur mis à jour avec succès");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        await api.delete("/api/auth/me");
        localStorage.removeItem("token");
        setError(null);
        alert("Compte supprimé avec succès");
        history.push("/login");
      } catch (err) {
        setError(err.response?.data?.error || "Erreur lors de la suppression.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Profil</h2>
      {error && <div className="error">{error}</div>}
      {user && (
        <div>
          <div className="form-group">
            <label>Nom d'utilisateur :</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="form-input"
            />
          </div>
          <button onClick={handleUpdate} className="button">
            Mettre à jour
          </button>
          <button
            onClick={handleDelete}
            className="button button-danger"
            style={{ marginLeft: "10px" }}
          >
            Supprimer le compte
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;