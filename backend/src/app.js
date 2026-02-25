import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/service.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use("/api/services", serviceRoutes);

// health
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend funcionando correctamente" });
});

export default app;
