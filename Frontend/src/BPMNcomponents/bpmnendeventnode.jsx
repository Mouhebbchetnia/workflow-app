import React from "react";
import { Handle, Position } from "@xyflow/react";
import "./bpmnendeventnode.css";

const BPMNEndEventNode = ({ data, isConnectable }) => {
  return (
    <div className="bpmn-end-event-node">
      {/* Contenu du noeud avec label optionnel */}
      {data && data.label && <span className="event-label">{data.label}</span>}

      {/* Sortie en bas */}
      <Handle
        type="target"
        position={Position.Top}
        id="bottom"
        className="handle-top"
        isConnectable={isConnectable}
      />

      {/* Sortie à droite */}
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        className="handle-right"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default BPMNEndEventNode;