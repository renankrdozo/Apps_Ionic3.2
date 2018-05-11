import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Constants} from "../../utils/constants";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public email: string;
  public facebook = {
    nome: "",
    fotoUrl: ""
  }
  public fotoPerfil: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastUtil) {

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
    console.log('ionViewDidLoad ProfilePage');
  }

}
