import cors from "cors";
import express from "express";
import { trpcExpress } from "@elearning-fliki/trpc-server";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Mars!");
});

app.use("/trpc", trpcExpress);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
