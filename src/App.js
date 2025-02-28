import React, { useState } from "react";
import axios from "axios";
import './App.css';

const YouTubeSidebar = ({ videos }) => {
  return (
    <div className="sidebar">
      <h2 className="text-xl font-bold mb-4 text-center">Recommended Videos</h2>
      <div className="space-y-4">
        {videos.length === 0 ? (
          <p className="text-center">No videos available</p>
        ) : (
          videos.map((video, index) => (
            <a
              key={index}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="video-item"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
              />
              <p className="mt-2 text-sm font-semibold">{video.title}</p>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

function App() {
  const [destination, setDestination] = useState("");
  const [numDates, setNumDates] = useState(1);
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]); // Store YouTube videos dynamically

  const fetchItinerary = async () => {
    setLoading(true);
    setVideos([]); // Clear the videos state to refresh it before fetching new ones
    try {
      const response = await axios.get("http://localhost:5000/get_itinerary", {
        params: { destination, num_dates: numDates },
      });

      setItinerary(response.data.itinerary);
      setVideos(response.data.youtube_videos); // Set the new YouTube videos

    } catch (error) {
      console.error("Error fetching itinerary:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      {/* Left Sidebar - YouTube Videos */}
      <div className="left-column">
        <YouTubeSidebar videos={videos} />
      </div>

      {/* Right Column - Itinerary Display */}
      <div className="right-column">
        <h1>Travel Itinerary Generator</h1>

        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
          {/* Destination Input */}
          <div className="flex flex-col">
            <label className="font-medium">Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Number of Days Input */}
          <div className="flex flex-col">
            <label className="font-medium">Number of Days:</label>
            <input
              type="number"
              value={numDates}
              onChange={(e) => setNumDates(Number(e.target.value))}
              min="1"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Button to Fetch Itinerary */}
          <button
            onClick={fetchItinerary}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition text-center"
          >
            {loading ? "Loading..." : "Get Itinerary"}
          </button>
        </div>

        {/* Itinerary Display */}
        <div className="max-w-lg mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">Itinerary</h2>
          {itinerary.split("Day ").map((section, index) => {
            if (!section.trim()) return null;

            const parts = section.split(":");
            const title = parts[0] ? `Day ${parts[0]}` : "";
            const content = parts.slice(1).join(":").split(". ");

            return (
              <div key={index} className="mb-4">
                {title && <h3 className="text-red-500 font-semibold">{title}</h3>}
                <ul className="list-disc ml-6">
                  {content.map((sentence, idx) =>
                    sentence.trim() ? <li key={idx}>{sentence.trim()}.</li> : null
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

