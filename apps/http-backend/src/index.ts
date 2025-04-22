import express from "express";
import canvasRoutes from "./routes/canvas";
import sessionRoutes from "./routes/sessionRoutes";
import authRoutes from "./routes/authRoutes";
import http from "http";

const app = express();
app.use(express.json());
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am alive. All api end points works in their respective routes",
  });
});
app.use("/api/canvas", canvasRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/auth", authRoutes);

const port = 3002;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
