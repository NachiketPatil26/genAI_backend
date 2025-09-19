# Legal Document Demystifier

## Project Overview

This project is a full-stack application designed to demystify legal documents using Google's Gemini AI. It consists of a Node.js/Express backend and a React/Vite frontend, providing tools for jargon detection, risk analysis, text simplification, and conversational AI interaction.

## Features

### Backend

*   **Jargon Detection:** Identifies and explains legal jargon within documents.
*   **Risk Analysis:** Highlights potentially risky clauses.
*   **Translation and Simplification:** Translates and simplifies complex legal text.
*   **Visualization Data Generation:** Prepares data for visual representations of document insights.
*   **Conversational Chat Interface:** Answers questions about a document using Gemini AI.

### Frontend

*   **Document Upload:** Allows users to upload legal documents (PDF, TXT).
*   **Document Viewer:** Displays the uploaded document text.
*   **Interactive Analysis:** Integrates with backend APIs to show jargon, risks, and other insights.
*   **Chat Interface:** Provides a conversational AI to query document content.

## Technologies Used

### Backend

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (via Mongoose)
*   **Caching:** Redis
*   **AI Integration:** Google Gemini API (`@google/generative-ai`)
*   **PDF Parsing:** `pdf-parse`
*   **Logging:** `pino`
*   **Security:** `helmet`, `cors`, `express-rate-limit`

### Frontend

*   **Framework:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **HTTP Client:** Axios
*   **Charting:** Recharts

## Getting Started

### Prerequisites

*   Node.js (v20 LTS recommended)
*   npm
*   Docker and Docker Compose (if using Docker)

### Configuration

#### Backend Configuration

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

#### Frontend Configuration

No specific environment variables are currently required for the frontend beyond what's handled by Vite's build process.

### Running with npm

#### Backend

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

#### Frontend

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

### Running with Docker Compose

*(Instructions for Docker Compose will be added here once the `docker-compose.yml` is fully configured for both frontend and backend.)*

## Development Conventions

### Linting and Formatting

Both backend and frontend use ESLint for linting and Prettier for code formatting.

#### Backend

*   **Lint:** `npm run lint`
*   **Format:** `npm run format`

#### Frontend

*   **Lint:** `npm run lint`

### Testing

#### Backend

The backend uses Jest for testing.
*   **Run tests:** `npm test`

## Contributing

Contributions are welcome! Please follow the standard GitHub flow: fork the repository, create a branch for your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details. (Note: A `LICENSE` file is not yet present in the repository.)
