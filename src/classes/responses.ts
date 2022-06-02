// Import interfaces
import { ISuccess, IError } from "../interfaces/responses";

class CSuccess implements ISuccess {
  /**
   * Classe que retorna sucesso
   * @param success Status da resposta
   * @param data Dados retornados
   */
  constructor(public success: boolean, public message: string, public data: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

class CError implements IError {
  /**
   * Classe que retorna erro
   * @param success Status da resposta
   * @param message Mensagem de erro
   * @param error Erro
   */
  constructor(public success: boolean, public message: string, public error: any) {
    this.success = success;
    this.message = message;
    this.error = error;
  }
}

export { CSuccess, CError };
