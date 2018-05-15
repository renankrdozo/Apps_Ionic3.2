import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {WordpressService} from "../../services/wordpress.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {Observable} from "rxjs/Observable";
import {HomePage} from "../login/login";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";
import {AngularFireAuth} from "angularfire2/auth";
import {Constants} from "../../utils/constants";

@IonicPage()
@Component({
  selector: 'page-postpage',
  templateUrl: 'postpage.html',
})
export class Postpage {

  public post: any;
  public user: string;
  public categories: Array<any> = new Array<any>();
  private constants: Constants = new Constants();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadCtrl: LoadingController,
              public wordpress: WordpressService,
              public toastCtrl: ToastUtil,
              public fireAuth: AngularFireAuth) {
  }

  public ionViewDidEnter() {
    this.getItemData();
  }

  public getItemData() {
    let loading = this.loadCtrl.create();
    loading.present();
    this.post = this.navParams.get("item");
    Observable.forkJoin(this.getAuthorData(),
      this.getCategories()).subscribe(data => {
      const response = (data as any);
      console.log("dataaaa", data);
      this.user = response[0].name;
      this.categories = response[1];
      loading.dismiss();
    });
  }

  public getAuthorData() {
    return this.wordpress.getAuthor(this.post.author);
  }

  public getCategories() {
    return this.wordpress.getPostCategories(this.post);
  }

  public logout() {
    this.toastCtrl.createToast();
    this.fireAuth.auth.signOut();
    this.toastCtrl.setMessage(this.constants.MESSAGE_LOGOUT);
    this.toastCtrl.present();
    this.navCtrl.setRoot(HomePage);
  }


}
