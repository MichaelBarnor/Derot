import React, { useState } from "react";

export default function Settings({ onClose, onTimerOptionChange }) {
  // Local state for the timer option; default is 5 minutes.
  const [timerOption, setTimerOption] = useState(5);

  // Handles selecting an option: set the option, propagate change, and close the popup.
  const selectOption = (option) => {
    setTimerOption(option);
    if (onTimerOptionChange) {
      onTimerOptionChange(option);
    }
    onClose();
  };

  return (
    <div className="settings-popup">
      <h2>Timer</h2>
      <h3>Select Timer Option</h3>
      <div>
        <button onClick={() => selectOption(5)}>15 Seconds</button>
        <button onClick={() => selectOption(5)}>5 Minutes</button>
        <button onClick={() => selectOption(10)}>10 Minutes</button>
        <button onClick={() => selectOption(15)}>15 Minutes</button>
        <button onClick={() => selectOption(20)}>20 Minutes</button>
      </div>
    </div>
  );
}