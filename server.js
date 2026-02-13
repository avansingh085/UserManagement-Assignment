import express from 'express';
import cors from 'cors';
import { FRONTEND_URL, PORT } from './config/server.config.js';
import userRoutes from './routes/user.routes.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import connectDB from './config/connectDB.js';
const app = express();
app.use(cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectDB();

app.use("/api/users", userRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log("server running on port=", PORT)
})