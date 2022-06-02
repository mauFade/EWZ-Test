// Import modules
import { Request, Response } from "express";
import crypto from "crypto";

// Import classes
import { CSuccess, CError } from "../classes/responses";

// Import database
import prisma from "../services/prisma";

// Import helper
import helper from "../helpers/helper";

class AuthenticationController {
  /**
   * Rota para fazer login de um usuário
   * @param request Dados de login (email e senha)
   * @returns Token de acesso
   */
  async create(request: Request, response: Response): Promise<any> {
    try {
      // Recebe dados do corpor da requisição
      const { email, password }: { email: string; password: string } = Object(request["body"]);

      // Se algum dos dados não for reapassado
      if (!email || !password) {
        // Retorna erro
        return response
          .status(403)
          .send(new CError(false, "Error at method create.", "Email and password are required."));
      }

      // Gera id aleatório
      const userToken = crypto.randomBytes(10).toString("hex");

      // Busca id do usuário
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      // Se não for encontrado um usuário com esse email no banco
      if (user === null) {
        // Retorna erro
        return response
          .status(404)
          .send(new CError(false, "Error at method create.", "No user found with this email."));
      }

      // Se a senha estiver errada
      if (password !== user["password"]) {
        // Retorna erro
        return response.status(403).send(new CError(false, "Error at method create.", "Wrong password."));
      }

      // Desetrutura id
      const userId = user!["id"];

      // Gera token de acesso
      const token = await helper.generateToken(userId, userToken);

      return response.status(200).send(new CSuccess(true, "Successfully logged!", token));

      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError(false, "Error at method create.", error));
    }
  }
}

export default new AuthenticationController();
