import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {DicasPage} from "../dicas/dicas";
import {Constants} from "../../utils/constants";
import {ToastCtrl} from "../../providers/toast-ctrl/toast-ctrl";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  private constants: Constants = new Constants();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastCtrl) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  public register() {
    this.toastCtrl.createToast();
    this.fireAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      this.toastCtrl.setMessage("Registrado com sucesso!");
      console.log("dados do usuário : " + data);
      this.toastCtrl.present();
      this.navCtrl.setRoot(DicasPage);
    }).catch((error: any) => {
      //tratando os tipos de erro para o cadastro firebase
      this.responseTypeError(error);

    });
  }


  private responseTypeError(error: any) {
    if (error.code == this.constants.CODE_EMAIL_ALREADY) {
      this.toastCtrl.setMessage(this.constants.EMAIL_ALREADY);
    } else if (error.code == this.constants.CODE_INVALID_EMAIL) {
      this.toastCtrl.setMessage(this.constants.EMAIL_INVALID);
    } else if (error.code == this.constants.CODE_NOT_ALLOWED) {
      this.toastCtrl.setMessage(this.constants.ACCOUNT_NOT_ALOWED);
    } else if (error.code == this.constants.CODE_WEAK_PASSWORD) {
      this.toastCtrl.setMessage(this.constants.PASSWORD_WEAK);
    }
    this.toastCtrl.present();
  }

}
