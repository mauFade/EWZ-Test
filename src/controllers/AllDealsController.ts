// Import modules
import { Request, Response } from "express";
import axios from "axios";

// Import classes
import { CSuccess, CError } from "../classes/responses";

// Import database
import prisma from "../services/prisma";

class AllDealsController {
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

      // Retorna dados
      return response.status(200).send(new CSuccess(true, "Data found!", { postgreData, pipedriveData }));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError(false, "Error at method read.", error));
    }
  }
}

export default new AllDealsController();
