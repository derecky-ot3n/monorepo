export function getErrorMessage(code: string | any): string {
  let codeStr = code;

  if (typeof code !== "string") codeStr = code.code;

  switch (codeStr) {
    case "vehicle.not.found":
      return "Veículo não encontrado.";
    case "invalid.captcha.token":
      return "Request inválida.";
    case "error.validation":
      return "Certifique-se que os dados inseridos estão corretos.";
    case "error.simulation.create":
      return "Valide seus dados e tente novamente!";
    case "simulation.not.found":
      return "Simulação não encontrada.";
    case "order.already.created":
      return "Pagamento já criado, finalize o atual ou espere a expiração.";
    case "invalid.payment.type":
      return "Tipo de pagamento inválido.";
    case "invalid.id":
      return "Identificador inválido.";
    case "order.not.found":
      return "Pagamento não encontrado.";
    case "payment.reproved":
      return "Pagamento reprovado, valide os dados do cartão e tente novamente!";
    case "not.found":
      return "Não encontrado!";
    default:
      return "Ocorreu um erro, tente novamente mais tarde!";
  }
}
