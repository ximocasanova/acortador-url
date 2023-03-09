import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    setShortUrl(data.shortUrl);
    setUrl("");
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a URL to shorten"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;