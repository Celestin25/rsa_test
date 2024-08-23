import React from 'react';

const QuoteGroup = ({ groupName, quotes }) => {
  return (
    <div className="quote-group">
      <h2>{groupName}</h2>
      {quotes.map((quote, index) => (
        <div key={index} className="quote">
          <p>"{quote.quote}"</p>
          <p><em>- {quote.author}</em></p>
        </div>
      ))}
    </div>
  );
};

export default QuoteGroup;
