import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Constants} from "../../utils/constants";
import {HomePage} from "../login/login";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";
import {WordpressService} from "../../services/wordpress.service";

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
  public loader;
  public moreAvailablePage: boolean = true;
  public posts: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastUtil,
              public loadCtrl: LoadingController,
              public wordPress: WordpressService) {
  }


  public ionViewDidEnter() {
    this.getRecentPosts();
  }


  public logout() {
    this.toastCtrl.createToast();
    this.fireAuth.auth.signOut();
    this.toastCtrl.setMessage(this.constants.MESSAGE_LOGOUT);
    this.toastCtrl.present();
    this.navCtrl.setRoot(HomePage);
  }

  //iniciando loading na página
  public initLoading() {
    this.loader = this.loadCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  //encerra o loading
  public closeLoading() {
    this.loader.dismiss();
  }

  public getRecentPosts() {
    this.moreAvailablePage = true;
    if (!(this.posts.length > 0)) {
      this.initLoading();
      this.wordPress.getRecentPosts().subscribe(res => {
        const response = (res as any);
        for (let post of response) {
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + '<p>';
          this.posts.push(post);
        }
        console.log("REQUEST recent post");
        console.log(this.posts);

      });
      this.closeLoading();
      console.log(this.posts);
    }

  }

}
