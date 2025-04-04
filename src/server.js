import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { routerApi } from "./routes/index.router.js";  

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3366;


app.use(cors({ origin: "*" }));


app.use(express.json());

const frontendPath = path.resolve("D:/UAM/Aprendizaje en Línea/");
app.use(express.static(frontendPath));


app.get("/", (req, res) => {
  res.sendFile("Home/home.html", { root: frontendPath });
});


routerApi(app);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
