// Interface de dados da resposta de sucesso
interface ISuccess {
  success: boolean;
  message: string;
  data: any;
}

// Interface de dados da resposta de erro
interface IError {
  success: boolean;
  message: string;
  error: any;
}

export { ISuccess, IError };
