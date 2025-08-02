import './App.css';
import React, { useState } from 'react';

function App() {

  // State for the user input URL
  const [inputUrl, setInputUrl] = useState('');

  // State for the shortened URL
  const [shortenedUrl, setShortenedUrl] = useState('Enter your link to begin!');

  // UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100">
      
      {/* header */}
      <h1 className="text-6xl font-bold text-black">
        Welcome to Quicklink!!
      </h1>

      {/* container */}
      <div className="flex items-center gap-x-4 justify-center bg-white shadow-lg rounded-2xl p-7 mt-10">
        {/* input field */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter your link here"
            className="p-4 w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
        </div>

        {/* button */}
        <div className="mt-4">
          <button className="px-6 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => {
              // Check if the input URL is not empty
              if (inputUrl.trim() === '') {
                alert('Please enter a valid URL');
                return;
              }
              // POST input URL to backend
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/shorturl`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: inputUrl }),
              })
              .then(response => response.json())
              .then(data => {
                // Update the shortened URL state with the response from the backend
                if (data.short_url){ 
                  const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/shorturl/`;
                  setShortenedUrl(baseUrl + data.short_url);
                  setInputUrl(''); // Clear the input field 
                }
                else 
                  setShortenedUrl('Error shortening URL');
              })
              .catch(error => {
                console.error('Error:', error);
                setShortenedUrl('Error shortening URL');
              });
            }}>
            Submit
          </button> 
        </div>
      </div>

      {/* shortened link */}
      <div className="mt-10">
        <p className="text-gray-800 text-xl">
          Shortened Link: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{shortenedUrl}</a>
        </p>
      </div>
    </div>
  );
}

export default App;
