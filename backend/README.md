# Legal Document Demystifier Backend

This backend provides a set of APIs to demystify legal documents using the power of Google's Gemini AI. It can analyze legal text to detect jargon, identify risky clauses, translate and simplify text, generate data for visualizations, and provide a conversational chat interface to answer questions about a document.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v20 LTS recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```sh
   cd legal-doc-demystifier-backend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the root of the `legal-doc-demystifier-backend` directory.
2. Add the following environment variables to the `.env` file:

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

3. **Important**: Replace `your_gemini_api_key_here` with your actual Google Gemini API key.

### Running the Server

```sh
npm start
```

The server will start on the port specified in your `.env` file (default is 3001).

## API Endpoints

Here are some example test cases using `curl`.

### 1. Jargon Detection

**Request:**

```sh
curl -X POST http://localhost:3001/api/jargon \
-H "Content-Type: application/json" \
-d '{
  "text": "This agreement is subject to the force majeure clause."
}'
```

**Response:**

```json
{
  "jargon": [
    {
      "term": "force majeure",
      "startPosition": 32,
      "endPosition": 45,
      "explanation": "A clause that frees both parties from liability or obligation when an extraordinary event or circumstance beyond their control occurs."
    }
  ]
}
```

### 2. Risk Analysis

**Request:**

```sh
curl -X POST http://localhost:3001/api/risk-radar \
-H "Content-Type: application/json" \
-d '{
  "text": "The tenant shall forfeit the entire security deposit if the lease is terminated early."
}'
```

**Response:**

```json
{
  "risks": [
    {
      "clause": "The tenant shall forfeit the entire security deposit if the lease is terminated early.",
      "startPosition": 0,
      "endPosition": 88,
      "riskLevel": "HIGH",
      "reason": "This clause is high risk because it allows the landlord to keep the entire security deposit without any conditions or exceptions."
    }
  ]
}
```

### 3. Translate and Simplify

**Request:**

```sh
curl -X POST http://localhost:3001/api/translate \
-H "Content-Type: application/json" \
-d '{
  "text": "Notwithstanding any other provision of this Agreement, the parties hereto agree to the following.",
  "targetLanguage": "Spanish"
}'
```

**Response:**

```json
{
  "translatedText": "A pesar de cualquier otra disposición de este Acuerdo, las partes acuerdan lo siguiente."
}
```

### 4. Generate Visualization Data

**Request:**

```sh
curl -X POST http://localhost:3001/api/visualize \
-H "Content-Type: application/json" \
-d '{
  "text": "This is a simple contract with a payment clause and a termination clause."
}'
```

**Response:**

```json
{
  "clauseCategories": [
    { "name": "Payment", "value": 1 },
    { "name": "Termination", "value": 1 }
  ],
  "riskDistribution": [
    { "level": "HIGH", "count": 0 },
    { "level": "MEDIUM", "count": 0 },
    { "level": "LOW", "count": 1 }
  ],
  "complexity": { "score": 25, "readabilityLevel": "8th Grade" }
}
```

### 5. Chat with Document

**Request:**

```sh
curl -X POST http://localhost:3001/api/chat \
-H "Content-Type: application/json" \
-d '{
  "documentContext": "The rent is due on the first of every month. A late fee of $50 will be charged if the rent is not paid by the fifth of the month.",
  "question": "What happens if I pay my rent late?"
}'
```

**Response:**

```json
{
  "answer": "If you pay your rent late, you will be charged a late fee of $50."
}
```

## Project Structure

The backend follows a modular structure to separate concerns:

```
legal-doc-demystifier-backend/
├── src/
│   ├── controllers/  # Handles incoming requests and sends responses
│   ├── services/     # Contains the core business logic (e.g., Gemini API integration)
│   ├── models/       # Mongoose models for MongoDB
│   ├── middleware/   # Express middleware (e.g., auth, error handling)
│   ├── routes/       # Defines the API routes
│   ├── utils/        # Utility functions (e.g., PDF parsing)
│   └── config/       # Configuration files (e.g., database connection)
├── .env              # Environment variables
├── package.json      # Project dependencies and scripts
└── server.js         # The main entry point for the application
```
