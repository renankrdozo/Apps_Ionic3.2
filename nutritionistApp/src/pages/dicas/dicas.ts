import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Constants} from "../../utils/constants";
import {HomePage} from "../login/login";
import {ToastCtrl} from "../../providers/toast-ctrl/toast-ctrl";

/**
 * Generated class for the DicasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  private constants: Constants = new Constants();
  public email: string;
  public facebook = {
    nome: "",
    fotoUrl: ""
  }
  public fotoPerfil: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastCtrl) {
    this.email = fireAuth.auth.currentUser.email;
    this.facebook.nome = fireAuth.auth.currentUser.displayName;
    this.facebook.fotoUrl = fireAuth.auth.currentUser.photoURL;

    if (this.facebook.fotoUrl == null) {
      this.fotoPerfil = false;
      console.log("FOTO URL false " + this.facebook.fotoUrl);

    } else {
      this.fotoPerfil = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DicasPage');
  }

  public logout() {
    this.toastCtrl.createToast();
    this.fireAuth.auth.signOut();
    this.toastCtrl.setMessage(this.constants.MESSAGE_LOGOUT);
    this.toastCtrl.present();
    this.navCtrl.setRoot(HomePage);
  }

}
