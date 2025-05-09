import React, { useState, useEffect } from "react";
import api from "../services/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/notifications");
        setNotifications(response.data);
        setError("");
      } catch (err) {
        setError("Erreur lors du chargement des notifications : " + (err.response?.data?.message || err.message));
        console.error("Fetch notifications error:", err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {notifications.length === 0 && !error ? (
        <p>Aucune notification disponible.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;