import express from "express";
import authRoutes from './routes/auth.js';
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.listen(5000, () => console.log("Backend is running on http://localhost:5000"));
