import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Mars!");
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
