import express from "express";
import cors from "cors";
// import authRouter from "./routes/authRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.send("Server is up and running");
});
// app.use("/api/auth", authRouter);

export default app;
