import React from "react";

export default function Settings({ onClose, onTimerOptionChange }) {
  // Handles selecting an option: propagate change, save to backend, and close the popup.
  const selectOption = async (option) => {
    // Save the selected timer option to the backend
    try {
      const response = await fetch('http://localhost/Derot_DB/backend/api/save_timer_option.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_time: option }), // Send the time in seconds directly
      });
      const data = await response.json();
      console.log('Timer option saved:', data);
    } catch (error) {
      console.error('Error saving timer option:', error);
    }

    if (onTimerOptionChange) {
      onTimerOptionChange(option);
    }
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="settings-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Timer</h2>
        <h3>Select Timer Option</h3>
        <div>
          <button className="my-button" onClick={() => selectOption(15)}>15 Seconds</button>
          <button className="my-button" onClick={() => selectOption(300)}>5 Minutes</button>
          <button className="my-button" onClick={() => selectOption(600)}>10 Minutes</button>
          <button className="my-button" onClick={() => selectOption(900)}>15 Minutes</button>
          <button className="my-button" onClick={() => selectOption(1200)}>20 Minutes</button>
        </div>
      </div>
    </div>
  );
}