import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/User";
import { Carro } from "./entities/Carro";
import { Aluguel } from "./entities/Aluguel";
import { Conversa } from "./entities/Conversa";
import { Mensagem } from "./entities/Mensagem";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_URL ? undefined : (process.env.DB_HOST || "localhost"),
    port: process.env.DATABASE_URL ? undefined : (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432),
    username: process.env.DATABASE_URL ? undefined : (process.env.DB_USER || "postgres"),
    password: process.env.DATABASE_URL ? undefined : (process.env.DB_PASSWORD || "secret"),
    database: process.env.DATABASE_URL ? undefined : (process.env.DB_NAME || "buscar_db"),
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    synchronize: true, // Auto-cria tabelas, ideal apenas para dev. Em prod usar migrations.
    logging: false,
    entities: [User, Carro, Aluguel, Conversa, Mensagem],
    migrations: [],
    subscribers: [],
});
