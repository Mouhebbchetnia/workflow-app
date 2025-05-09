import React, { useState, useEffect } from "react";
import api from "../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        setError("");
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs : " + (err.response?.data?.message || err.message));
        console.error("Fetch users error:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setError("");
    } catch (err) {
      setError("Erreur lors de la suppression de l'utilisateur : " + (err.response?.data?.message || err.message));
      console.error("Delete user error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestion des Utilisateurs</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {users.length === 0 && !error ? (
        <p>Aucun utilisateur disponible.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.email}
              <button onClick={() => handleDelete(user.id)} style={{ marginLeft: "10px", color: "red" }}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUsers;