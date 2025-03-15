import express from "express";
import cors from "cors";
import {authRouter,roleRouter,userRouter} from "./routes/";

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.send("Server is up and running");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/user", userRouter);

export default app;
