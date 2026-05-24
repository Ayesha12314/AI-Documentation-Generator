const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/test-ai", (req, res) => {
  res.send("AI Documentation Generator is working!");
});

// Documentation Generator Route
app.post("/generate-docs", (req, res) => {
  const { code } = req.body;

  const functionMatches =
    code.match(/function\s+([a-zA-Z0-9_]+)/g) || [];

  const functions = functionMatches.map((fn) =>
    fn.replace("function ", "")
  );

  const apiMatches =
    code.match(/app\.(get|post|put|delete)\s*\(/g) || [];

  res.json({
    documentation: `
# Project Documentation

## Overview
This code was analyzed automatically.

## Code Statistics
Characters: ${code.length}

Functions Found: ${functions.length}

${functions.map((f) => `- ${f}`).join("\n")}

## API Endpoints
Detected APIs: ${apiMatches.length}

## README
This project contains JavaScript code.
`,
  });
});
// Start Server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});