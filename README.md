# Node.js Express Boilerplate

A basic, clean, and robust boilerplate for building Node.js RESTful APIs with Express.

## Features

- **Express** - the core web framework.
- **Morgan** - HTTP request logger.
- **Helmet** - helps secure Express apps by setting various HTTP headers.
- **CORS** - provides Connect/Express middleware that can be used to enable CORS.
- **Dotenv** - loads environment variables from a `.env` file into `process.env`.
- **Nodemon** - auto-restarts the server during development on file changes.
- **Global Error Handling** - catches and formats all errors centrally.

## Project Structure

```text
├── src/
│   ├── app.js               # Express application initialization & middleware setup
│   ├── index.js             # Entry point (Server initialization)
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Custom middlewares (e.g., error handler)
│   └── routes/              # Express route definitions
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .gitignore               # Ignored files by Git
├── package.json             # NPM dependencies and scripts
└── README.md                # Project documentation
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   A `.env` file has been generated for you with default values (port 3000). You can change them as needed.

3. **Start the application in Development Mode**:
   ```bash
   npm run dev
   ```
   The server will start running on `http://localhost:3000/`. nodemon will watch for code changes and automatically restart the server.

4. **Start the application in Production Mode**:
   ```bash
   npm start
   ```

## API Testing

You can verify the setup by sending a GET request to the root or the test endpoint:
- **Base Route:** `GET http://localhost:3000/`
- **Home Route:** `GET http://localhost:3000/api/home`
