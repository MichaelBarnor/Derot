import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Quote() {
  const [quote,   setQuote]   = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res  = await fetch('http://localhost/Derot_DB/backend/api/get-quote.php');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setQuote(data.quote);
    } catch {
      setQuote('Failed to load quote.');
    } finally {
      setLoading(false);
    }
  };

//   useEffect(fetchQuote, []);
    useEffect(() => {
        fetchQuote();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>We know your screen time is crazy, so let's be mindful</h1>
        {loading ? <p>Loading…</p> : <p>{quote}</p>}
        <button className="my-button" onClick={() => navigate('/timer')}>
          Let's start here
        </button>
      </header>
    </div>
  );
}

export default Quote;