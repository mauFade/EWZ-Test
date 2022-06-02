// Import modules
import { Request, Response } from "express";
import crypto from "crypto";

// Import classes
import { CSuccess, CError } from "../classes/responses";

// Import database
import prisma from "../services/prisma";

// Import helper
import helper from "../helpers/helper";

class UserController {
  /**
   * Rota para criação de um novo usuário
   * @param name Nome do usuário
   * @param email email do usuário
   * @param password Senha do usuário
   * @returns Usuário criado
   */
  async create(request: Request, response: Response): Promise<any> {
    try {
      // Recebe dados de criação do corpo da requisição
      const { name, email, password }: { name: string; email: string; password: string } = Object(request["body"]);

      // Se não receber algum dado
      if (!name || !email || !password) {
        // Retorna erro
        return response.status(403).send(new CError(false, "Error at method create.", "All fields are required."));
      }

      // Faz validação do email enviado
      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      // Se o email enviado for válido
      if (email.match(mailFormat)) {
        // Faz verificação no banco para saber se algum usuário com este email já existe
        const sameEmail = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        // Se já houver o mesmo email cadastrado
        if (sameEmail !== null) {
          // Retorna aviso
          return response
            .status(403)
            .send(new CError(false, "Error at method create.", "A user with this email already exists."));
        }

        // Cria o usuário
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password,
          },
        });

        // Seleciona id do usuário
        const userId = user["id"];

        // Gera id aleatório
        const userToken = crypto.randomBytes(10).toString("hex");

        // Gera token de acesso
        const token = await helper.generateToken(userId, userToken);

        // Retorna sucesso
        return response.status(201).send(new CSuccess(true, "User created successfully!", { user, token }));
      }
      // se não, retorna erro
      else {
        return response.status(403).send(new CError(false, "Error at method create.", "You must send a valid email."));
      }
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError(false, "Error at method create.", error));
    }
  }

  /**
   * Rota para leitura de todos os usuários
   * @returns Array de usuários
   */
  async read(request: Request, response: Response): Promise<any> {
    try {
      // Busca todos os usuários do banco
      const users = await prisma.user.findMany();

      // Retorna array de usuários
      return response.status(200).send(new CSuccess(true, "Users found!", users));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError(false, "Error at method read.", error));
    }
  }

  /**
   * Rota para fazer atualização de dados do usuário
   * @param request Dados para autalização
   * @returns Usuário atualizado
   */
  async update(request: Request, response: Response): Promise<any> {
    try {
      // Recebe os novos dados do corpo da requisição
      const { newName, newEmail, newPassword }: { newName?: string; newEmail?: string; newPassword?: string } = Object(
        request["body"]
      );

      // Recebe id do usuário pelo token
      const { token } = Object(request["query"]);

      // Desestrutura token
      const userId = token["userId"];

      // Atualiza dados do usuário
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: newName,
          email: newEmail,
          password: newPassword,
        },
      });

      // Retorna novos dados do usuário
      return response.status(200).send(new CSuccess(true, "Successfully updated!", user));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError(false, "Error at method update.", error));
    }
  }

  /**
   * Rota para deletar usuário
   * @returns Usuário deletado
   */
  async delete(request: Request, response: Response): Promise<any> {
    try {
      // Busca token
      const { token } = Object(request["query"]);

      // Desestrutura id do usuário pelo token
      const userId = token["userId"];

      // Apaga registro do usuário
      const user = await prisma.user.delete({
        where: {
          id: userId,
        },
        select: {
          name: true,
          email: true,
        },
      });

      // Retorna usuário inativo
      return response.status(200).send(new CSuccess(true, "Successfully deleted.", user));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError(false, "Error at method delete.", error));
    }
  }
}

export default new UserController();
