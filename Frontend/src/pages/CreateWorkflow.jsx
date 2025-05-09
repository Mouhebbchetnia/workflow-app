import React, { useState, useCallback } from "react";
import { ReactFlow, ReactFlowProvider, addEdge, useNodesState, useEdgesState, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import paletteObjects from "../BPMNcomponents/bpmnpalette";
import BPMNStartEventNode from "../BPMNcomponents/bpmnstarteventnode";
import BPMNEndEventNode from "../BPMNcomponents/bpmnendeventnode";
import BPMNtaskNode from "../BPMNcomponents/bpmntasknode";
import BPMNexclusiveGateway from "../BPMNcomponents/bpmnexclusivegateway";
import "./CreateWorkflow.css";

// Définir les types de nœuds personnalisés
const nodeTypes = {
  bpmnStartNode: BPMNStartEventNode,
  bpmnEndNode: BPMNEndEventNode,
  bpmnTaskNode: BPMNtaskNode,
  bpmnExclusiveGateway: BPMNexclusiveGateway,
};

const CreateWorkflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [workflowName, setWorkflowName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("label");

      if (!type) return;

      const position = {
        x: event.clientX - 100,
        y: event.clientY - 50,
      };

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleSave = async () => {
    try {
      if (nodes.length === 0) {
        setError("Veuillez ajouter au moins un nœud avant de sauvegarder.");
        return;
      }

      const workflowData = {
        nodes,
        edges,
      };
      console.log("Envoi des données au backend :", { name: workflowName || "Nouveau Workflow", data: workflowData, userId: 1 });
      const response = await api.post("/workflows", {
        name: workflowName || "Nouveau Workflow",
        data: JSON.stringify(workflowData),
        userId: 1,
      });
      console.log("Réponse du backend :", response.data);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      console.error("Détails de l'erreur :", err.response ? err.response.data : err.message);
      setError("Erreur lors de la sauvegarde du workflow. Vérifiez la console pour plus de détails.");
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px", backgroundColor: "#1a1a1a", minHeight: "100vh", color: "#fff" }}>
      {/* Palette */}
      <div style={{ width: "200px", marginRight: "20px" }}>
        <h3>Palette des tâches</h3>
        <input type="text" placeholder="Rechercher..." style={{ width: "100%", padding: "5px", marginBottom: "10px" }} />
        <div>
          {paletteObjects.map((item, index) => (
            <button
              key={index}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("application/reactflow", item.type);
                e.dataTransfer.setData("label", item.name);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "5px",
                backgroundColor: "#333",
                border: "none",
                color: "#fff",
                cursor: "move",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      {/* Zone de modélisation */}
      <div style={{ flex: 1 }}>
        <h1>Modélisation du workflow : {workflowName || "Nouveau Workflow"}</h1>
        <input
          type="text"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          placeholder="Nom du workflow"
          style={{ padding: "10px", margin: "10px 0", borderRadius: "5px", border: "none", width: "300px" }}
        />
        <ReactFlowProvider>
          <div style={{ height: "500px", border: "1px solid #ccc" }} onDrop={onDrop} onDragOver={onDragOver}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <button
          onClick={handleSave}
          style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "10px" }}
        >
          Valider Workflow
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default CreateWorkflow;