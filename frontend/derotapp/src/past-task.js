import React from "react";

export default function PastTask({ onClose }) {
  return (
    <div className="past-task-popup">
      <h2>Past Task</h2>
      <p>View details of past tasks here.</p>
      <button  onClick={onClose}>Close Past Task</button>
    </div>
  );
}