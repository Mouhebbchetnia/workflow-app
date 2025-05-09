import React from "react";
import { Handle, Position } from "@xyflow/react";
import "./bpmnstarteventnode.css";

const BPMNStartEventNode = ({ data, isConnectable }) => {
  return (
    <div className="bpmn-start-event-node">
      {/* Contenu du noeud avec label optionnel */}
      {data && data.label && <span className="event-label">{data.label}</span>}

      {/* Sortie en bas */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="handle-bottom"
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

export default BPMNStartEventNode;