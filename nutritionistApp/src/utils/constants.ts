export class Constants {

  //tipos de erros do firebase para registro de usuário
  public CODE_INVALID_EMAIL: string = "auth/invalid-email";
  public CODE_EMAIL_ALREADY: string = "auth/email-already-in-use";
  public CODE_NOT_ALLOWED: string = "auth/operation-not-allowed";
  public CODE_WEAK_PASSWORD: string = "auth/weak-password";

  //tipos de mensagens para o registro do usuário
  public EMAIL_ALREADY: string = "O e-mail digitado já existe!";
  public EMAIL_INVALID: string = "O e-mail digitado não é válido!";
  public ACCOUNT_NOT_ALOWED: string = "Você não tem permissão para cadastrar uma conta!";
  public PASSWORD_WEAK: string = "Essa senha é muito curta!";

}
