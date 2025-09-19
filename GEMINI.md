# Project Overview

This project is a full-stack application designed to demystify legal documents using Google's Gemini AI. It consists of a Node.js/Express backend and a React/Vite frontend.

## Backend

The backend, named "Legal Document Demystifier Backend," provides a set of APIs to analyze legal text. Its core functionalities include:
*   **Jargon Detection:** Identifying and explaining legal jargon.
*   **Risk Analysis:** Highlighting risky clauses in documents.
*   **Translation and Simplification:** Translating and simplifying complex legal text.
*   **Visualization Data Generation:** Preparing data for visual representations of document insights.
*   **Conversational Chat Interface:** Answering questions about a document using Gemini AI.

**Key Technologies:**
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (via Mongoose)
*   **Caching:** Redis
*   **AI Integration:** Google Gemini API (`@google/generative-ai`)
*   **PDF Parsing:** `pdf-parse`
*   **Logging:** `pino`
*   **Security:** `helmet`, `cors`, `express-rate-limit`

## Frontend

The frontend is a React application built with Vite. It provides the user interface for interacting with the backend's functionalities.

**Key Technologies:**
*   **Framework:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **HTTP Client:** Axios
*   **Charting:** Recharts

# Building and Running

This project can be set up and run in two main ways: directly via `npm` commands for both frontend and backend, or using Docker Compose for a containerized environment.

## Prerequisites

*   Node.js (v20 LTS recommended)
*   npm
*   Docker and Docker Compose (if using Docker)

## Configuration

Both the backend and frontend require environment variables.

### Backend Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```
NODE_ENV=development
PORT=3001

# Database
MONGODB_URI=mongodb://localhost:27017/legal-docs
REDIS_URL=redis://localhost:6379

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=legal-docs-storage

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=7d
```
**Important:** Replace `your_gemini_api_key_here` with your actual Google Gemini API key.

### Frontend Configuration

(TODO: Add frontend environment variables if any, e.g., for API endpoint)

## Running with npm

### Backend

1.  Navigate to the `backend/` directory:
    ```sh
    cd backend/
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the server:
    ```sh
    npm start
    ```
    The backend server will run on `http://localhost:3001` (or the port specified in your `.env`).

### Frontend

1.  Navigate to the `frontend/` directory:
    ```sh
    cd frontend/
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```
    The frontend development server will typically run on `http://localhost:5173` (or another available port).

## Running with Docker Compose

(TODO: Provide instructions for running with `docker-compose up` if a `docker-compose.yml` is fully configured for both frontend and backend.)

# Development Conventions

## Linting and Formatting

Both backend and frontend use ESLint for linting and Prettier for code formatting.

### Backend

*   **Lint:** `npm run lint`
*   **Format:** `npm run format`

### Frontend

*   **Lint:** `npm run lint`

## Testing

### Backend

The backend uses Jest for testing.
*   **Run tests:** `npm test`
