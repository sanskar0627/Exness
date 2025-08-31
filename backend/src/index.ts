import express from "express";
import authRoutes from './routes/auth.js'
import balanceRoutes from "./routes/balanceRoutes.js";


const app = express();
app.use(express.json());


app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/user/balance", balanceRoutes);


app.listen(5000, () =>
  console.log("Backend is running on http://localhost:5000")
);
