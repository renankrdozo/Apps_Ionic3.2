import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {DicasPage} from "../dicas/dicas";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";
import {ResponseError} from "../../utils/response-error";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  private responseError: ResponseError = new ResponseError();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastUtil) {
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
      this.responseError.responseTypeErrorRegister(error, this.toastCtrl)

    });
  }
}
