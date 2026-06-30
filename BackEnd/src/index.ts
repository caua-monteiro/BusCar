import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";

import { routes } from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
import path from "path";
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/ping", (req, res) => {
    res.json({ message: "pong", status: "ok" });
});

app.use(routes);

import { setupWebSocket } from "./websocket";
import { createServer } from "http";

const PORT = process.env.PORT || process.env.APP_PORT || 3000;

const server = createServer(app);
setupWebSocket(server);

AppDataSource.initialize()
    .then(() => {
        console.log("🔥 Banco de dados conectado com sucesso via TypeORM!");
        
        server.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => console.log("Erro ao conectar no banco:", error));
