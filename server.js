import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
const PORT = 3001;

dotenv.config();
// create an express instance
const app = express();

// enable cors for all the routes
app.use(cors());

// create a server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
