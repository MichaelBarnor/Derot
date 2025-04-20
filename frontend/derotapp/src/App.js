import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [quote, setQuote] = useState(''); // State to store the quote
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch a random quote from the API
  const fetchQuote = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await fetch('http://localhost/Derot_DB/backend/api/get-quote.php');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data.quote); // Update the quote state with the fetched quote
    } catch (error) {
      console.error('Error fetching the quote:', error);
      setQuote('Failed to load quote. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch a quote when the component loads
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Quote</h1>
        {loading ? <p>Loading...</p> : <p>{quote}</p>}
        <button onClick={fetchQuote}>Get Another Quote</button>
      </header>
    </div>
  );
}

export default App;
