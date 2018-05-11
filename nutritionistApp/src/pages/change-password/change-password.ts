import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Constants} from "../../utils/constants";
import {ToastCtrl} from "../../providers/toast-ctrl/toast-ctrl";

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  @ViewChild('usuario') email;

  private constants: Constants = new Constants();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastCtrl) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  public changePassword() {
    this.toastCtrl.createToast();
    this.fireAuth.auth.sendPasswordResetEmail(this.email.value).then(data => {
      this.toastCtrl.setMessage(this.constants.MESSAGE_CHANGE_PASSWORD);
      this.toastCtrl.present();
      //volta para a página anterior.
      this.navCtrl.pop()
    }).catch((error: any) => {
      this.responseTypeError(error);
    });


  }

  private responseTypeError(error: any) {
    if (error.code == this.constants.CODE_INVALID_EMAIL) {
      this.toastCtrl.setMessage(this.constants.EMAIL_INVALID);
    } else if (error.code == this.constants.CODE_USER_NOT_FOUND) {
      this.toastCtrl.setMessage(this.constants.USER_NOT_FOUND);
    }
    this.toastCtrl.present();
  }

}
