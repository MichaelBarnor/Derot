import React, { useState, useEffect } from "react";

export default function PastTask({ onClose }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost/Derot_DB/backend/api/get_past_tasks.php');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching past tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="past-task-popup">
      <h2>Past Tasks</h2>
      {tasks.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{task.task_name ? task.task_name : "Unnamed Task"}</strong> – 
              Doomscroll Percentage: {task.doom_percentage}%
            </li>
          ))}
        </ul>
      ) : (
        <p>No past tasks found.</p>
      )}
      <button className="my-button" onClick={onClose}>Close Past Task</button>
    </div>
  );
}