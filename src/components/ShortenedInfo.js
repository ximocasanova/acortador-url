import React, { useState, useEffect } from "react";
import axios from "axios";

const ShortenedInfo = () => {
  const [lastUrl, setLastUrl] = useState("Loading...");

  useEffect(() => {
    const fetchLastUrl = async () => {
      const response = await axios.get("http://localhost:3000/api/shorten");
      setLastUrl(response.data.shortUrl);
    };

    fetchLastUrl();
  }, []);

  return (
    <div>
      <h2>Last shortened URL: </h2>
      <p>{lastUrl}</p>
    </div>
  );
};

export default ShortenedInfo;
