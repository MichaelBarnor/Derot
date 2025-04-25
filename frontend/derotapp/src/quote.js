import React, { useState, useEffect } from 'react';

function Quote() {
  const [quote, setQuote]     = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => { // 
    setLoading(true);
    try {
      const res  = await fetch('http://localhost/Derot_DB/backend/api/get-quote.php'); // Get the quote from the php api
      if (!res.ok) throw new Error();// if there it didnt wokr return a error
      const data = await res.json();// get the data in json foramt
      setQuote(data.quote);// 
    } catch {
      setQuote('Failed to load quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>We know you're screen time is crazy, so let’s be mindful!</h1>
        {loading ? <p>Loading…</p> : <p>{quote}</p>}
        <a href="/mainpage.html" className="my-button">
          Let's start here
        </a>
      </header>
    </div>
  );
}

export default Quote;