import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Constants} from "../../utils/constants";
import {HomePage} from "../login/login";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastUtil) {
  }

  public logout() {
    this.toastCtrl.createToast();
    this.fireAuth.auth.signOut();
    this.toastCtrl.setMessage(this.constants.MESSAGE_LOGOUT);
    this.toastCtrl.present();
    this.navCtrl.setRoot(HomePage);
  }

}
