import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import WorkflowEditor from "./pages/EditWorkflow.jsx";
import CreateWorkflow from "./pages/CreateWorkflow.jsx";
import Stats from "./pages/Stats.jsx";
import Notifications from "./pages/Notifications.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";

const App = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/editor/:id?"
          element={isAuthenticated() ? <WorkflowEditor /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={isAuthenticated() ? <CreateWorkflow /> : <Navigate to="/login" />}
        />
        <Route
          path="/stats"
          element={isAuthenticated() ? <Stats /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={isAuthenticated() ? <Notifications /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/users"
          element={isAuthenticated() ? <AdminUsers /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;