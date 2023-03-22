import React, { useState } from "react";

function ShortenForm(props) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    
    if (response.ok) {
      const data = await response.json();
      const shortenedUrl = { id: data.id, url: data.shortUrl };
      props.addShortenedUrl(shortenedUrl);
      setUrl("");
    } else {
      alert("Invalid URL");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="urlInput">URL</label>
        <input
          type="url"
          className="form-control"
          id="urlInput"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Shorten
      </button>
    </form>
  );
}

export default ShortenForm;
