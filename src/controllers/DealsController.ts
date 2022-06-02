// Import modules
import { Request, Response } from "express";
import axios from "axios";

// Import database
import prisma from "../services/prisma";

// Import classes
import { CSuccess, CError } from "../classes/responses";

class DealsController {
  /**
   * Rota para criação de um novo deal na API do Pipedrive
   * @param request Dados pra criação
   * @returns Deal criado
   */
  async create(request: Request, response: Response): Promise<any> {
    try {
      // Recebe dados do corpo da requisição para criação
      const {
        title,
        description,
        value,
        status,
      }: { title: string; description: string; value: string; status: string } = Object(request["body"]);

      // Se não houver dados enviados
      if (!title || !description || !value || !status) {
        // Retorna erro
        return response.status(403).send(new CError(false, "Error at method create.", "All fields are required."));
      }

      // Cria o deal na api do Pipedrive
      const data = await axios.post(
        "https://api.pipedrive.com/v1/deals?api_token=39a0749011ea0262c1d28a595902dba4a3855de5",
        {
          title,
          value,
          status,
          add_time: new Date(),
        }
      );

      // Define uma variável pra data efetiva do Pipedrive
      const allData = data["data"]["data"];

      // Também salva no banco de dados PostgreSQL esse pedido
      const deal = await prisma.deal.create({
        data: {
          description: description,
          products: allData["products_count"],
          oportunityId: allData["id"],
          value: allData["value"],
          createdAt: new Date(),
          clientName: allData["creator_user_id"]["name"],
          clientEmail: allData["creator_user_id"]["email"],
          userId: allData["user_id"]["id"],
          status: allData["status"],
        },
      });

      // Retorna sucesso com os dados criados na API do piepdrive e no banco de dados
      return response.status(200).send(
        new CSuccess(true, "Successfully created deeals at Pipedrive API and on PostgreSQL database", {
          Pipedrive: data["data"]["data"],
          deal,
        })
      );
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError(false, "Error at method create.", error));
    }
  }

  /**
   * Rota para listar todos os deals com status de "won"
   * @returns Won deals array
   */
  async read(request: Request, response: Response): Promise<any> {
    try {
      // Busca dados na API do Pipedrive
      const data = await axios.get(
        "https://api.pipedrive.com/v1/deals?api_token=39a0749011ea0262c1d28a595902dba4a3855de5"
      );

      // Define uma variável para dados do Pipedrive
      const pipedriveData = data["data"]["data"];

      // Busca dados no banco de dados Postgre
      const postgreData = await prisma.deal.findMany();

      // Define output para os dados do postgre
      const postgreOutput: object[] = [];

      // Define outpur para os dados do pipedrive
      const pipedriveOutput: object[] = [];

      // Faz filtro do banco de dados para retornar apenas pedidos com status de won
      for (const index in postgreData) {
        // Se o não for igual a won, é retirado do array
        if (postgreData[index]["status"] !== "won") {
          delete postgreData[index];
        }
      }

      // Insere os dados restantes no output
      for (const index in postgreData) {
        // Evita com que null's sejam retornados
        if (postgreData[index] !== null) {
          postgreOutput.push(postgreData[index]);
        }
      }

      // Faz filtro do banco de dados para retornar apenas pedidos com status de won
      for (const index in pipedriveData) {
        // Se o não for igual a won, é retirado do array
        if (pipedriveData[index]["status"] !== "won") {
          delete pipedriveData[index];
        }
      }

      // Insere os dados restantes no output
      for (const index in pipedriveData) {
        // Evita com que null's sejam retornados
        if (pipedriveData[index] !== null) {
          pipedriveOutput.push(pipedriveData[index]);
        }
      }

      // Retorna dados
      return response.status(200).send(new CSuccess(true, "Data found!", { postgreOutput, pipedriveOutput }));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError(false, "Error at method read.", error));
    }
  }
}

export default new DealsController();
