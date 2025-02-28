# **Travel Planner App**

## **Overview**

The **Travel Planner App** is a web application that helps users generate personalized travel itineraries and discover popular travel videos from YouTube. The backend is built using **Flask**, while the frontend is developed with **React**.

## **Features**

- Generates a detailed travel itinerary using **OpenAI GPT-4**
- Fetches top travel videos from **YouTube API**
- Cross-Origin Resource Sharing (**CORS**) enabled for frontend-backend communication

## **Technologies Used**

### **Backend (Flask)**

- Flask (Python web framework)
- OpenAI API (for generating itineraries)
- YouTube Data API (for fetching videos)
- Flask-CORS (to enable frontend communication)
- Google API Client Library

### **Frontend (React)**

- React.js (JavaScript UI framework)
- Axios (for making API requests to the backend)
- Bootstrap / Tailwind CSS (for styling)

### **Get Travel Itinerary & Videos **

GET /get_itinerary?destination=Paris&num_days=3

### ** Response Format: **

{
"itinerary": "Day 1: Visit the Eiffel Tower 🗼...",
"youtube_videos": [
{
"title": "Top 10 Places to Visit in Paris",
"link": "https://www.youtube.com/watch?v=xyz123",
"thumbnail": "https://img.youtube.com/..."
}
]
}
