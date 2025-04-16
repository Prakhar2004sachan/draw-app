import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am alive. All api end points works in their respective routes",
  });
});

app.listen(3002);
