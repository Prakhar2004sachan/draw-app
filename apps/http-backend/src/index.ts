import express from "express";
import canvasRoutes from "./routes/canvas";
import sessionRoutes from "./routes/sessionRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am alive. All api end points works in their respective routes",
  });
});
app.use("/api/canvas", canvasRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/auth", authRoutes);

app.listen(3002);
