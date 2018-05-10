import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Constants} from "../../utils/constants";

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

  public toast: any;
  private constants: Constants = new Constants();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastController) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  private createToast() {
    return this.toastCtrl.create({duration: 3000, position: 'bottom'});
  }

  public changePassword() {
    this.toast = this.createToast();
    this.fireAuth.auth.sendPasswordResetEmail(this.email.value).then(data => {
      this.toast.setMessage(this.constants.MESSAGE_CHANGE_PASSWORD);
      this.toast.present();
      //volta para a página anterior.
      this.navCtrl.pop()
    }).catch((error: any) => {
      this.responseTypeError(error);
    });


  }

  private responseTypeError(error: any) {
    if (error.code == this.constants.CODE_INVALID_EMAIL) {
      this.toast.setMessage(this.constants.EMAIL_INVALID);
    } else if (error.code == this.constants.CODE_USER_NOT_FOUND) {
      this.toast.setMessage(this.constants.USER_NOT_FOUND);
    }
    this.toast.present();
  }

}
