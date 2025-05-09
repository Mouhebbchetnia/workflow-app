import React, { useEffect, useRef } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

const WorkflowEditor = () => {
  const containerRef = useRef(null);
  const modelerRef = useRef(null);

  useEffect(() => {
    if (!modelerRef.current) {
      modelerRef.current = new BpmnModeler({
        container: containerRef.current,
      });

      // Diagramme initial corrigé avec un nœud "Début événement"
      const initialDiagram =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
        'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
        'id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">' +
        '<bpmn:collaboration id="Collaboration_1">' +
        '<bpmn:participant id="Participant_1" processRef="Process_1" />' +
        '</bpmn:collaboration>' +
        '<bpmn:process id="Process_1" isExecutable="false">' +
        '<bpmn:startEvent id="StartEvent_1" name="Début" />' +
        '</bpmn:process>' +
        '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
        '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1">' +
        '<bpmndi:BPMNShape id="Shape_Participant_1" bpmnElement="Participant_1">' +
        '<dc:Bounds x="150" y="100" width="600" height="250" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="Shape_StartEvent_1" bpmnElement="StartEvent_1">' +
        '<dc:Bounds x="200" y="200" width="36" height="36" />' +
        '</bpmndi:BPMNShape>' +
        '</bpmndi:BPMNPlane>' +
        '</bpmndi:BPMNDiagram>' +
        '</bpmn:definitions>';

      modelerRef.current.importXML(initialDiagram, (err) => {
        if (err) {
          console.error("Erreur lors du chargement initial :", err);
        } else {
          const canvas = modelerRef.current.get("canvas");
          canvas.zoom("fit-viewport");
        }
      });
    }

    return () => {
      if (modelerRef.current) {
        modelerRef.current.destroy();
        modelerRef.current = null;
      }
    };
  }, []);

  const validateWorkflow = () => {
    modelerRef.current.saveXML({ format: true }, (err, xml) => {
      if (err) {
        console.error("Erreur lors de la validation :", err);
        alert("Erreur lors de la validation du workflow : " + err.message);
      } else {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "application/xml");
        const nodes = xmlDoc.getElementsByTagName("bpmn:startEvent");
        if (nodes.length === 0) {
          alert("Le workflow doit contenir au moins un nœud.");
        } else {
          alert("Workflow validé avec succès !");
        }
      }
    });
  };

  return (
    <div style={{ display: "flex", height: "80vh" }}>
      <div
        style={{
          width: "200px",
          background: "#1e1e1e",
          padding: "10px",
          color: "#fff",
        }}
      >
        <h3>Palette des tâches</h3>
        <input type="text" placeholder="Rechercher..." style={{ width: "100%", marginBottom: "10px" }} />
        <div>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              marginBottom: "5px",
              background: "#333",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => modelerRef.current.get("palette").open()}
          >
            Début événement
          </button>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              marginBottom: "5px",
              background: "#333",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => modelerRef.current.get("palette").open()}
          >
            Authentification
          </button>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              marginBottom: "5px",
              background: "#333",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => modelerRef.current.get("palette").open()}
          >
            Commander produit
          </button>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              marginBottom: "5px",
              background: "#333",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => modelerRef.current.get("palette").open()}
          >
            Dashboard
          </button>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              marginBottom: "5px",
              background: "#333",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => modelerRef.current.get("palette").open()}
          >
            Fin événement
          </button>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              marginBottom: "5px",
              background: "#333",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => modelerRef.current.get("palette").open()}
          >
            Exclusive Gateway
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        style={{ flex: 1, border: "1px solid #ccc", position: "relative" }}
      />
      <button
        onClick={validateWorkflow}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Valider Workflow
      </button>
    </div>
  );
};

export default WorkflowEditor;