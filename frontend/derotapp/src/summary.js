import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Summary() {
  const { state } = useLocation();
  const { total=0, focus=0, doom=0 } = state || {};
  const navigate = useNavigate();

  const fmt = s => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const pct = total ? ((doom / total) * 100).toFixed(1) : 0;

  return (
    <div>
      <h2>Task Summary</h2>
      <p>Total Time: {fmt(total)}</p>
      <p>Focus Time: {fmt(focus)}</p>
      <p>Doomscroll Time: {fmt(doom)}</p>
      <p>Doomscroll %: {pct}%</p>
      <button onClick={() => navigate('/')}>Start Over</button>
    </div>
  );
}