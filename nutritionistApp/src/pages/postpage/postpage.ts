import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {WordpressService} from "../../services/wordpress.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-postpage',
  templateUrl: 'postpage.html',
})
export class Postpage {

  public post: any;
  public user: string;
  public categories: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadCtrl: LoadingController,
              public wordpress: WordpressService) {
  }

  public ionViewDidEnter() {
    this.getItemData();
  }

  public getItemData(){
  let loading = this.loadCtrl.create();
  loading.present();
  this.post = this.navParams.get("item");
  console.log(this.post);

}

public getAuthorData(){
    return this.wordpress.getAuthor(this.post.author);
}

public getCategories(){
  return this.wordpress.getPostCategories(this.post);
}


}
