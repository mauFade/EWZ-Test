// Import modules
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Import key
import key from "../config/key.json";

class Auth {
  /**
   * Função para verificar a validade do token enviado
   * @returns Next
   */
  async verifyJWT(request: Request, response: Response, next: NextFunction) {
    // Se não houver headers
    if (!request["headers"]["authorization"]) {
      // Retorna erro
      return response.status(401).send({ auth: false, message: "No authorization token provided." });
    }

    // Busca token
    let token = "";
    token = request["headers"]["authorization"];
    token = token.replace(/^Bearer /, "");

    // Se ainda não for encontrado token
    if (!token) {
      // Retorna erro
      return response.status(401).send({ auth: false, message: "No token provided." });
    }

    // Verifica validade do token
    jwt.verify(token, key.secret, (err, decoded) => {
      // Se o token não for válido
      if (err || !decoded) {
        // Retorna erro
        return response.status(401).send({ auth: false, message: "Failed to authenticate token." });
      }
      // Guarda o token
      request["query"]["token"] = decoded;

      return next();
    });
  }
}

export default new Auth();
