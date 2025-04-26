import React from 'react';

export default function Summary({ total = 0, focus = 0, doom = 0, taskName = '', onClose }) {
  const fmt = s => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const pct = total ? ((doom / total) * 100).toFixed(1) : 0;

  const handleClose = async () => {
    try {
      const response = await fetch('http://localhost/Derot_DB/backend/api/insert_summary.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task_name: taskName, // Include taskName in the request
          total_time: total,
          focus_time: focus,
          doom_time: doom,
          doom_percentage: parseFloat(pct)
        })
      });
      const data = await response.json();
      console.log('Summary inserted:', data);
    } catch (error) {
      console.error('Error inserting summary:', error);
    }
    onClose();
  };

  return (
    <div className="summary-popup">
      <h2>Task Summary</h2>
      <p>Task Name: {taskName}</p>
      <p>Total Time: {fmt(total)}</p>
      <p>Focus Time: {fmt(focus)}</p>
      <p>Doomscroll Time: {fmt(doom)}</p>
      <p>Doomscroll Percenatge: {pct}%</p>
      <button className='my-button' onClick={handleClose}>Close Summary</button>
    </div>
  );
}