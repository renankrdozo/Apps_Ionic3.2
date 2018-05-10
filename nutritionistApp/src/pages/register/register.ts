import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {DicasPage} from "../dicas/dicas";
import {Constants} from "../../utils/constants";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  public toast: any;
  private constants: Constants = new Constants();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastController) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //init toast
  private createToast() {
    return this.toastCtrl.create({duration: 3000, position: 'bottom'});
  }

  public register() {
    this.toast = this.createToast();
    this.fireAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      this.toast.setMessage("Registrado com sucesso!");
      console.log("dados do usuário : " + data);
      this.toast.present();
      this.navCtrl.setRoot(DicasPage);
    }).catch((error: any) => {
      //tratando os tipos de erro para o cadastro firebase
      this.responseTypeError(error);

    });
  }


  private responseTypeError(error: any) {
    if (error.code == this.constants.CODE_EMAIL_ALREADY) {
      this.toast.setMessage(this.constants.EMAIL_ALREADY);
    } else if (error.code == this.constants.CODE_INVALID_EMAIL) {
      this.toast.setMessage(this.constants.EMAIL_INVALID);
    } else if (error.code == this.constants.CODE_NOT_ALLOWED) {
      this.toast.setMessage(this.constants.ACCOUNT_NOT_ALOWED);
    } else if (error.code == this.constants.CODE_WEAK_PASSWORD) {
      this.toast.setMessage(this.constants.PASSWORD_WEAK);
    }
    this.toast.present();
  }

}
