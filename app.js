import express from "express";
import mongoose from "mongoose";
import { connect } from "./utils/database.connection.js";
import logger from "./utils/logger.js";

import lessonRoutes from "./routes/lessonRoutes.js";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    // Respond to preflight request
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/lessons", lessonRoutes);

// Error handling middleware for 404 errors
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

// General error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connect();
});

// Body Parsing Middleware: app.use(express.json());
// The express.json() middleware in an Express application allows your server to parse incoming requests with JSON payloads. This is particularly useful for handling POST, PUT, and PATCH requests where the client sends data in the body of the request.

// Purpose
// Enable JSON Parsing: It automatically parses JSON data in the request body and makes it available on the req.body property.
// Function
// Parsing JSON Payloads: When a request with a Content-Type of application/json is received, express.json() middleware parses the JSON string into a JavaScript object and attaches it to req.body.

//////////////
// CORS Middleware: app.use(cors());
// CORS stands for Cross-Origin Resource Sharing. It's a security feature implemented by browsers to control how web pages can request resources from a different domain than the one that served the web page.

// Purpose: The CORS middleware is used to enable and configure CORS in your Express application.
// Function: By using app.use(cors());, you are allowing your server to accept requests from different origins (domains). Without CORS, a web page could only make requests to the same origin it was loaded from.

///////////////////
// res.header("Access-Control-Allow-Origin", "*");
// Adds the Access-Control-Allow-Origin header to the response, indicating that the server allows requests from any origin.
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// Adds the Access-Control-Allow-Headers header to the response, specifying which headers can be used in the actual request.
// Invoke the Next Middleware or Route Handler:

// next();
// This calls the next middleware function in the stack, allowing the request to continue through the middleware chain.

// The provided middleware code modifies the HTTP response, not the HTTP request or the server configuration. Specifically, it adds CORS (Cross-Origin Resource Sharing) headers to the HTTP response to inform the browser that requests from other origins are allowed.
