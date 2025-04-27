import React, { useState, useEffect, useRef } from 'react';
import Summary from './summary';
import Settings from './settings';
import PastTask from './past-task';

export default function Timer() {
  const [total, setTotal] = useState(0);
  const [focus, setFocus] = useState(0);
  const [doom, setDoom] = useState(0);
  const [running, setRun] = useState(false);
  const [inDoom, setDooming] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPastTask, setShowPastTask] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskNameError, setTaskNameError] = useState('');
  const [selectedTime, setSelectedTime] = useState(0); // Store the selected timer option
  const [showDoomPopup, setShowDoomPopup] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio('/alert.mp3')); // store audio element

  // Create a ref to store the latest inDoom value
  const inDoomRef = useRef(false);
  useEffect(() => {
    inDoomRef.current = inDoom;
  }, [inDoom]);

  // Function to start the doomscroll countdown
  const startDoomCountdown = async () => {
    try {
      const response = await fetch('http://localhost/Derot_DB/backend/api/get_latest_timer_option.php');
      const data = await response.json();
      const timerValue = data.selected_time || 0;
      setSelectedTime(timerValue);
      setCountdown(timerValue);
      setDooming(true);

      const doomInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(doomInterval); // Stop countdown
            setShowDoomPopup(true); // Show popup
            audioRef.current.play(); // Play alert sound
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error fetching timer option:', error);
    }
  };

  const toggleDoom = () => {
    if (inDoom) {
      setDooming(false);
      setCountdown(0);
    } else {
      startDoomCountdown();
    }
  };

  // Function to close the popup and stop the audio
  const closeDoomPopup = () => {
    setShowDoomPopup(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // Function to actually start the timer
  const startTimer = () => {
    setRun(true);
    intervalRef.current = setInterval(() => {
      setTotal(t => t + 1);
      if (inDoomRef.current) {
        setDoom(d => d + 1);
      } else {
        setFocus(f => f + 1);
      }
    }, 1000);
  };

  // When start button is pressed, show task modal if task not yet set
  const handleStartClick = () => {
    setShowTaskModal(true);
  };

  // Called when user submits the task name
  const handleTaskSubmit = () => {
    if (!taskName.trim()) {
      setTaskNameError('Task name is required!');
      return;
    }
    setTaskNameError('');
    // Reset doomscroll state so a new task isn't already in doomscroll mode.
    setDoom(0);
    setCountdown(0);
    setDooming(false);
    setShowDoomPopup(false);

    setShowTaskModal(false);
    startTimer();
  };

  const end = () => {
    clearInterval(intervalRef.current);
    setShowSummary(true);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const fmt = s => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  // New function to reset the timer and task when closing summary
  const handleSummaryClose = () => {
    clearInterval(intervalRef.current);
    setTotal(0);
    setFocus(0);
    setDoom(0);
    setRun(false);
    setTaskName('');
    setShowSummary(false);
  };

  return (
    <>
      {/* Nav container */}
      <div className="nav-container">
        <button className="my-button" onClick={() => setShowSettings(true)}>
          Timer
        </button>
        <button className="my-button" onClick={() => setShowPastTask(true)}>
          View Past Task
        </button>
      </div>

      <div className="timer-all">
        <div className="timer-wrapper">
          <h1>Derot Watch</h1>
          {taskName && <h2> Current Task: {taskName}</h2>}
          <div className="timer-container">
            <p className="total-time">{fmt(total)}</p>
          </div>
          {!running ? (
            <button className="my-button" onClick={handleStartClick}>
              Start Task
            </button>
          ) : (
            <div className="actions-container">
              <button className="my-button" onClick={toggleDoom}>
                {inDoom ? 'End Doomscroll' : 'Doomscroll'}
              </button>
              <button className="my-button" onClick={end}>
                End Task
              </button>
            </div>
          )}
        </div>

        {showSummary && (
          <div className="modal">
            <Summary
              total={total}
              focus={focus}
              doom={doom}
              taskName={taskName} // Pass taskName to Summary
              onClose={handleSummaryClose}
            />
          </div>
        )}

        {showSettings && (
          <div className="modal">
            <Settings onClose={() => setShowSettings(false)} />
          </div>
        )}

        {showPastTask && (
          <div className="modal">
            <PastTask onClose={() => setShowPastTask(false)} />
          </div>
        )}

        {showTaskModal && (
          <div className="modal">
            <div className="task-modal-popup">
              <h2>What you working on?</h2>
              <input
                type="text"
                placeholder="Enter task name..."
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '80%' }}
              />
              {taskNameError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{taskNameError}</p>} {/* Display error */}
              <br />
              <div className="timer-container">
                <button className="my-button" onClick={handleTaskSubmit}>
                  Start Task
                </button>
              </div>
              <button
                className="my-button"
                onClick={() => setShowTaskModal(false)}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showDoomPopup && (
          <div className="modal">
            <div className="doom-popup">
              <h2>STOP SCROLLING!!!</h2>
              <p>Cmon let's get this munyun💵</p>
              <button className="my-button" onClick={closeDoomPopup}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}