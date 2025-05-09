import React from "react";
import { Handle, Position } from "@xyflow/react";
import "./bpmnexclusivegateway.css";

const BPMNexclusiveGateway = ({ data, isConnectable }) => {
  return (
    <div className="bpmn-exclusive-gateway">
      {/* Contenu du noeud avec label optionnel */}
      {data && data.label && <span className="gateway-label">{data.label}</span>}

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

export default BPMNexclusiveGateway;