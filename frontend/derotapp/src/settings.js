import React from "react";

export default function Settings({ onClose }) {
  return (
    <div className="settings-popup">
      <h2>Settings</h2>
      <p>Configure your application preferences here.</p>
      <button onClick={onClose}>Close Settings</button>
    </div>
  );
}