import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {DicasPage} from "../dicas/dicas";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class HomePage {
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController) {

  }

  public login() {
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    console.log("Usuário digitado foi: " + this.email.value);
    console.log("A senha digitada foi: " + this.password.value);
    if (this.email.value == "Vinicius" && this.password.value == "123") {
      this.navCtrl.push(DicasPage);
      toast.setMessage("Logado com sucesso!");
      toast.present();

    } else {
      toast.setMessage("Usuário ou senha não encontrados.");
      toast.present();
    }
  }

  public register() {
    this.navCtrl.push(RegisterPage);

  }

}
