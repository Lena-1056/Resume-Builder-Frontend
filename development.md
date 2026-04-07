# Frontend Development Guide

## Overview
This is a modern React application powered by Vite, utilizing Tailwind CSS for styling and Zustand for state management. It communicates with a Spring Boot REST API.

## Architecture

**Folder Structure**
- `src/components/`: Reusable, atomic UI components (e.g., `AuthModal.jsx`).
- `src/pages/`: Full route components mapping to visual pages (e.g., `Home.jsx`, `Dashboard.jsx`, `ResumeBuilder.jsx`).
- `src/services/`: Services to interact with external providers (`api.js` acts as the Axios client).
- `src/store/`: Zustand stores for global application states (`authStore.js`, `resumeStore.js`).
- `src/index.css`: Global styles including Tailwind directives.

## Tech Stack
- Frontend Framework: React (v18+)
- Build Tool: Vite
- CSS Framework: Tailwind CSS
- State Management: Zustand
- Routing: React Router v6
- HTTP Client: Axios
- Icons: Lucide React
- Notifications: React Hot Toast

## Setup & Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Application Locally
1. Start the React development server:
   ```bash
   npm run dev
   ```
2. The application will be accessible at `http://localhost:5173`. Make sure the Java Spring Boot backend is also running concurrently on port 8080.

## Environment Variables
The application relies on API communication. To change the base URL natively:
- Open `src/services/api.js`
- Modify the `baseURL` within the `axios.create` block. 
  *(Standardization typically moves this to `.env` file via `VITE_API_BASE_URL`)*.

## Building for Production
```bash
npm run build
```
The output will reside within the `/dist` directory. This static payload can be served universally (Nginx, Vercel, Netlify).

## Testing Scenarios / Common Fixes
**1. CORS Errors on login/register:** Ensure your Spring Boot backend's `WebSecurityConfig.java` has permissive frontend origins setup (specifically allowing `http://localhost:5173`).
**2. 401 Unauthorized globally:** If logged out randomly, the token might have expired. The Axios interceptor correctly handles 401 errors by flushing state and sending a custom `auth-unauthorized` event which triggers redirect to login.
