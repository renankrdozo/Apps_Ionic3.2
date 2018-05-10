import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {DicasPage} from "../dicas/dicas";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastController) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.fireAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      toast.setMessage("Registrado com sucesso!");
      console.log("dados do usuário : " + data);
      toast.present();
      this.navCtrl.setRoot(DicasPage);
    }).catch((error: any) => {
      //tratando o error no site do firebase
      if (error.code == "auth/email-already-in-use") {
        toast.setMessage("O e-mail digitado já existe!");
      } else if (error.code == "auth/invalid-email") {
        //teste
        toast.setMessage("O e-mail digitado não é válido!");
      } else if (error.code == "auth/operation-not-allowed") {
        toast.setMessage("Você não tem permissão para cadastrar uma conta!");
      } else if (error.code == "auth/weak-password") {
        toast.setMessage("A senha é muito curta!");
      }
      toast.present();
    });
  }

}
