import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Constants} from "../../utils/constants";
import {HomePage} from "../login/login";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";
import {WordpressService} from "../../services/wordpress.service";
import {Postpage} from "../postpage/postpage";

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
  public page = 1;
  public infiniteScroll;
  public refresher;
  //public isRefreshing: boolean = false;

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
    if (!this.posts.length > 0) {
      this.initLoading();
      this.wordPress.getRecentPosts().subscribe(res => {
        const response = (res as any);
        for (let post of response) {
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + '<p>';
          this.posts.push(post);
        }
        console.log("REQUEST recent post");
        console.log(this.posts);
        this.closeLoading();
        this.completeRefresher();
      }, error => {
        console
          .log(error);
        this.closeLoading();
        this.completeRefresher();
      });

    }else {
      console.log("jdjdjdjd");
      this.posts = this.posts;
      console.log(this.posts);
      this.completeRefresher();
    }
  }

  //enviando dado para outra pagina
  public postTapped(event, post) {
    this.navCtrl.push(Postpage, {
      item: post
    });
  }

  public doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length / 10)) + 1;
    let loading = true;
    this.infiniteScroll = infiniteScroll;
    console.log('infinity scroll');
    this.wordPress.getRecentPosts(page).subscribe(data => {
        const response = (data as any);
        for (let post of response) {
          if (!loading) {
            this.infiniteScroll.complete();
          } else {
            this.posts.push(post);
            loading = false;
          }
        }
      }, error => {
        this.moreAvailablePage = false;
      }
    );
  }

  public doRefresh(refresher) {
    this.refresher = refresher;
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.refresher.complete();
    }, 2000);
    //this.isRefreshing = true;
    // this.wordPress.getRecentPosts(this.page);
  }


  //método inicial que faz o refresh na página de filmes
  public doRefresh(refresher) {
    this.refresher = refresher;
    console.log('Begin async operation', refresher);
    this.isRefreshing = true;
    this.getRecentPosts();
  }

  public completeRefresher() {
    if (this.isRefreshing) {
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

}
