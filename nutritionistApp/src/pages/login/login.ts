import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {DicasPage} from "../dicas/dicas";
import {RegisterPage} from "../register/register";
import {AngularFireAuth} from "angularfire2/auth";
import {Users} from "./users";
import {Constants} from "../../utils/constants";
import {ChangePasswordPage} from "../change-password/change-password";
//importando firebase para fazer login com o facebook
import firebase from "firebase";


@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class HomePage {
  users: Users = new Users();
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  public toast: any;
  private constants: Constants = new Constants()

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public fireAuth: AngularFireAuth) {

  }

  //método abre um pop up para entrar com a conta do facebook
  public loginWithFacebook() {
    this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(data => {
      console.log("User facebook : ", data);
      this.navCtrl.setRoot(DicasPage);
    }).catch((error: any) => {


    });
  }


  public login() {
    this.toast = this.createToast();
    console.log("Usuário digitado foi: " + this.email.value);
    console.log("A senha digitada foi: " + this.password.value);
    this.fireAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      console.log("dados - login com sucesso : ", data);
      this.users.email = this.email;
      this.users.password = this.password;
      this.navCtrl.setRoot(DicasPage);


    }).catch((error: any) => {
      this.responseTypeErrorLogin(error);
    });
  }

  public changePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }

  public register() {
    this.navCtrl.push(RegisterPage);
  }

  //init toast
  private createToast() {
    return this.toastCtrl.create({duration: 3000, position: 'bottom'});
  }

  private responseTypeErrorLogin(error: any) {
    if (error.code == this.constants.CODE_INVALID_EMAIL) {
      this.toast.setMessage(this.constants.EMAIL_INVALID);
    } else if (error.code == this.constants.CODE_USER_DISABLED) {
      this.toast.setMessage(this.constants.USER_DISABLE);
    } else if (error.code == this.constants.CODE_USER_NOT_FOUND) {
      this.toast.setMessage(this.constants.USER_NOT_FOUND);
    } else if (error.code == this.constants.CODE_PASSWORD_WRONG) {
      this.toast.setMessage(this.constants.PASSWORD_WRONG);
    }
    this.toast.present();
  }

}
