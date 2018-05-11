import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

/*
  Generated class for the ToastCtrl provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastCtrl {
  public toast: any;

  constructor(public toastCtrl: ToastController) {
    console.log('Hello ToastCtrl Provider');
  }


  public createToast() {
    this.toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    return this.toast;
  }

  public setMessage(message: String) {
    this.toast.setMessage(message);
  }

  public present() {
    this.toast.present();
  }

}
