
# 🎬 Movie Search App

A modern, responsive movie browsing and search web application built with **React**, **Vite**, and **Appwrite**. Users can search for movies in real-time, view movie details, and track trending searches.

---

## ✨ Features

- **Dynamic Movie Search:** Real-time search functionality with debounced API queries.
- **Trending & Popular Movies:** Showcases trending and high-rated titles fetched via external movie APIs (e.g., TMDB).
- **Search Analytics / Metrics:** Powered by **Appwrite** to store, update, and track trending search queries.
- **Modern UI & Responsive Design:** Clean layout with loading spinners, clean movie cards, and optimized SVG/PNG assets.
- **Fast Build Times:** Configured with Vite for lightning-fast HMR and bundle optimization.

---

## 🛠️ Tech Stack

- **Frontend:** React (JSX), HTML5, CSS3
- **Build Tool:** Vite
- **Backend / Database:** Appwrite (Tracking search trends and analytics)
- **Linting & Code Quality:** ESLint

---

<img width="1842" height="891" alt="image" src="https://github.com/user-attachments/assets/0425b5f3-fab4-4234-90e8-1cae1bdd4fd0" />


🚀 Getting Started
Follow these steps to run the application locally on your machine.

Prerequisites
Node.js (version 18 or higher recommended)

npm or yarn / pnpm

Installation
Clone the repository:

Bash
git clone [https://github.com/egeberkay/movie-search-app.git](https://github.com/egeberkay/movie-search-app.git)
cd movie-search-app
Install dependencies:

Bash
npm install
Set up Environment Variables:
Create a .env.local file in the root directory and provide your API keys and Appwrite configuration:

VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
Start the development server:

Bash
npm run dev
Open the app:
Open your browser and navigate to http://localhost:5173.

📜 Available Scripts
npm run dev: Starts the local development server.

npm run build: Bundles the application for production.

npm run preview: Previews the production build locally.

npm run lint: Runs ESLint to check code quality.

📄 License
This project is open-source and available under the MIT License.
