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

  //tipos de erros do firebase para login de usuário
  public CODE_USER_DISABLED: string = "auth/user-disabled";
  public CODE_USER_NOT_FOUND: string = "auth/user-not-found";
  public CODE_PASSWORD_WRONG: string = "auth/wrong-password";
  //tipos de mensagens para o login do usuário
  public USER_DISABLE: string = "esse usuário está desativado";
  public USER_NOT_FOUND: string = "usuário não existe";
  public PASSWORD_WRONG: string = "sua senha está incorreta";

  //logout
  public MESSAGE_LOGOUT = "Usuário deslogado!"
  //redefinir senha
  public MESSAGE_CHANGE_PASSWORD = "A Solicitação foi enviada para o seu email";
  public USER_LOGIN_SUCCESS = "Usuário logado"
  //login visitant
  public LOGIN_VISITOR = "Login visitante habilitado";


}
