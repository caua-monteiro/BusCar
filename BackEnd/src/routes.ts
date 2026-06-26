import { Router } from "express";
import { AuthController } from "./modules/auth/auth.controller";
import { HomeController } from "./modules/home/home.controller";
import { CarrosController } from "./modules/carros/carros.controller";
import { authMiddleware } from "./middlewares/auth.middleware";

import { AlugueisController } from "./modules/alugueis/alugueis.controller";
import { UsuariosController } from "./modules/usuarios/usuarios.controller";
import { ChatController } from "./modules/chat/chat.controller";

export const routes = Router();

const authController = new AuthController();
const homeController = new HomeController();
const carrosController = new CarrosController();
const alugueisController = new AlugueisController();
const usuariosController = new UsuariosController();
const chatController = new ChatController();

// Auth
routes.post("/auth/register", authController.register);
routes.post("/auth/login", authController.login);

// Home
routes.get("/home", homeController.getDestaques);

// Carros
routes.get("/carros", carrosController.listAll);
routes.get("/carros/meus", authMiddleware, carrosController.getMeusCarros);
routes.get("/carros/:id", carrosController.getById);
routes.post("/carros", authMiddleware, carrosController.create);
routes.put("/carros/:id", authMiddleware, carrosController.update);
routes.delete("/carros/:id", authMiddleware, carrosController.delete);

// Aluguéis
routes.post("/alugueis", authMiddleware, alugueisController.create);
routes.get("/alugueis/meus", authMiddleware, alugueisController.listMeus);
routes.delete("/alugueis/:id", authMiddleware, alugueisController.cancel);

// Usuários
routes.get("/usuarios/me", authMiddleware, usuariosController.getMe);
routes.put("/usuarios/me", authMiddleware, usuariosController.update);
routes.put("/usuarios/me/senha", authMiddleware, usuariosController.updateSenha);
routes.delete("/usuarios/me", authMiddleware, usuariosController.delete);

// Chat
routes.post("/conversas", authMiddleware, chatController.criarConversa);
routes.get("/conversas", authMiddleware, chatController.listarConversas);
routes.get("/conversas/:id/mensagens", authMiddleware, chatController.listarMensagens);
routes.post("/conversas/:id/mensagens", authMiddleware, chatController.enviarMensagem);
