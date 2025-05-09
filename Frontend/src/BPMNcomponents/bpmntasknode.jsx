import React from "react";
import { Handle, Position } from "@xyflow/react";
import "./bpmntasknode.css";

const BPMNtaskNode = ({ data, isConnectable }) => {
  return (
    <div className="bpmn-task-node">
      {/* Contenu du noeud avec label optionnel */}
      {data && data.label && <span className="task-label">{data.label}</span>}

      {/* Entrée en haut */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="handle-top"
        isConnectable={isConnectable}
      />

      {/* Sortie en bas */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="handle-bottom"
        isConnectable={isConnectable}
      />

      {/* Entrée à gauche */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="handle-left"
        isConnectable={isConnectable}
      />

      {/* Sortie à droite */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="handle-right"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default BPMNtaskNode;