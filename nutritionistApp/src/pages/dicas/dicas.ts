import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Constants} from "../../utils/constants";
import {HomePage} from "../login/login";

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

  public toast: any;
  private constants: Constants = new Constants();
  public email: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastController) {
    this.email = fireAuth.auth.currentUser.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DicasPage');
  }

  public logout() {
    this.toast = this.createToast();
    this.fireAuth.auth.signOut();
    this.toast.setMessage(this.constants.MESSAGE_LOGOUT);
    this.toast.present();
    this.navCtrl.setRoot(HomePage);
  }

  //init toast
  private createToast() {
    return this.toastCtrl.create({duration: 3000, position: 'bottom'});
  }


}
