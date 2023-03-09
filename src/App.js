import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <h1>Acortador de URLs</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Introduce la URL que deseas acortar:
          <input type="text" value={url} onChange={handleChange} />
        </label>
        <button type="submit">Acortar URL</button>
      </form>
      {shortUrl && (
        <div>
          <p>La URL acortada es:</p>
          <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}
    </div>
  );
}

export default App;