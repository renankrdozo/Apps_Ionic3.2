import {ToastUtil} from "../providers/toast-ctrl/toast-util.service";
import {Constants} from "./constants";


export class ResponseError {

  private constants: Constants = new Constants();

  //tratamento de erros para a tela de login
  public responseTypeErrorLogin(error: any, toastCtrl: ToastUtil) {
    if (error.code == this.constants.CODE_INVALID_EMAIL) {
      toastCtrl.setMessage(this.constants.EMAIL_INVALID);
    } else if (error.code == this.constants.CODE_USER_DISABLED) {
      toastCtrl.setMessage(this.constants.USER_DISABLE);
    } else if (error.code == this.constants.CODE_USER_NOT_FOUND) {
      toastCtrl.setMessage(this.constants.USER_NOT_FOUND);
    } else if (error.code == this.constants.CODE_PASSWORD_WRONG) {
      toastCtrl.setMessage(this.constants.PASSWORD_WRONG);
    }
    toastCtrl.present();
  }

  //tratamento de erros para a tela de alterar senha
  public responseTypeErroChangePassword(error: any, toastCtrl: ToastUtil) {
    if (error.code == this.constants.CODE_INVALID_EMAIL) {
      toastCtrl.setMessage(this.constants.EMAIL_INVALID);
    } else if (error.code == this.constants.CODE_USER_NOT_FOUND) {
      toastCtrl.setMessage(this.constants.USER_NOT_FOUND);
    }
    toastCtrl.present();
  }

  //tratamento de erros para a tela de cadastrar
  public responseTypeErrorRegister(error: any, toastCtrl: ToastUtil) {
    if (error.code == this.constants.CODE_EMAIL_ALREADY) {
      toastCtrl.setMessage(this.constants.EMAIL_ALREADY);
    } else if (error.code == this.constants.CODE_INVALID_EMAIL) {
      toastCtrl.setMessage(this.constants.EMAIL_INVALID);
    } else if (error.code == this.constants.CODE_NOT_ALLOWED) {
      toastCtrl.setMessage(this.constants.ACCOUNT_NOT_ALOWED);
    } else if (error.code == this.constants.CODE_WEAK_PASSWORD) {
      toastCtrl.setMessage(this.constants.PASSWORD_WEAK);
    }
    toastCtrl.present();
  }

  //tratamento de erros para a login como visitante
  public responseTypeErrorLoginVisitor(error: any, toastCtrl: ToastUtil) {
    if (error.code == this.constants.CODE_NOT_ALLOWED) {
      toastCtrl.setMessage(this.constants.ACCOUNT_NOT_ALOWED);
    } else {
      toastCtrl.setMessage(error);
    }
  }
}
