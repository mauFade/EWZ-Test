// Imports
import express from "express";
import cors from "cors";
import router from "./router";

// Consts
const PORT = 3333;
const app = express();

// App uses
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

// Inicia o servidor
app.listen(PORT, () => {
  console.info(`API server listening on http://localhost:${PORT}/`);
});
