// Import modules
import jwt from "jsonwebtoken";

// Import key
import auth from "../config/key.json";

class helper {
  /**
   * Função para gerar token de acesso do usuário
   * @param userId Id do usuário cujo token está sendo criado
   * @param hash Hash md5 gerado para encriptação
   * @returns Token
   */
  async generateToken(userId: number, hash: string): Promise<string> {
    return jwt.sign({ userId, hash }, auth.secret, {
      // Token expira em 5hrs
      expiresIn: 18000,
      // 18000s = 5hrs
    });
  }
}

export default new helper();
