import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

/*
  Generated class for the ToastUtil provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastUtil {
  public toast: any;

  constructor(public toastCtrl: ToastController) {
    console.log('Hello ToastUtil Provider');
  }


  public createToast() {
    this.toast = this.toastCtrl.create({duration: 2000, position: 'botom'});
    return this.toast;
  }

  public setMessage(message: String) {
    this.toast.setMessage(message);
  }

  public present() {
    this.toast.present();
  }

}
