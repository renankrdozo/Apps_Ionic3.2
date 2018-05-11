import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Constants} from "../../utils/constants";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";
import {ResponseError} from "../../utils/response-error";

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
  private responseError: ResponseError = new ResponseError();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastUtil) {
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
      this.responseError.responseTypeErroChangePassword(error, this.toastCtrl);
    });
  }

}
