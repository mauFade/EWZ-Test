// Import modules
import { Router } from "express";

// Import services
import auth from "./services/authetication";

// Import de controllers
import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";
import DealsController from "./controllers/DealsController";
import AllDealsController from "./controllers/AllDealsController";

// Inicia o router
const router = Router();

// Rota de login
router.post("/login", AuthController.create);

// Rotas de usuário
router.post("/user", UserController.create);
router.get("/user", auth.verifyJWT, UserController.read);
router.put("/user", auth.verifyJWT, UserController.update);
router.delete("/user", auth.verifyJWT, UserController.delete);

// Rotas de deals (API do pipedrive)
router.post("/deals", auth.verifyJWT, DealsController.create);
router.get("/deals", auth.verifyJWT, DealsController.read);

// Rota que mostra todos os pedidos de um usuário
router.get("/deals/all", auth.verifyJWT, AllDealsController.read);

export default router;
