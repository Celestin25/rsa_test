import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteGroup from './QuoteGroup';

function App() {
  const [quoteGroups, setQuoteGroups] = useState({});
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
          headers: { 'X-Api-Key': 'SfFvYTOe07nJkBHiboztPw==ACLLmpIEyxyETchG' },
          params: { limit: 50 }
        });

        console.log('API Response:', response.data); 

        if (response.data && response.data.length > 0) {
          const groupedQuotes = response.data.reduce((groups, quote) => {
            const groupName = quote.category || 'Uncategorized';
            if (!groups[groupName]) {
              groups[groupName] = [];
            }
            groups[groupName].push(quote);
            return groups;
          }, {});
          setQuoteGroups(groupedQuotes);
        } else {
          console.error('No quotes found in the response.');
          setError('No quotes found.');
        }
      } catch (error) {
        console.error('Error fetching quotes:', error.response ? error.response.data : error.message);
        setError('Failed to fetch quotes.');
      } finally {
        setLoading(false);  
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="App">
      <h1>Quotes Collection</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : Object.keys(quoteGroups).length > 0 ? (
        Object.keys(quoteGroups).map((groupName) => (
          <QuoteGroup key={groupName} groupName={groupName} quotes={quoteGroups[groupName]} />
        ))
      ) : (
        <p>No quotes available.</p>
      )}
    </div>
  );
}

export default App;
