import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MovieProvider} from "../../providers/movie/movie";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  public object_feed = {
    name: "Vinicius Silva",
    date: "May 2, 2018",
    description: "Estou criando um app ionic.",
    qtd_likes: 14,
    qtd_comment: 4,
    time_feed: "11h ago"
  }

  private base_url: String = "https://api.themoviedb.org/3";
  private api_key: String = "2e3c87513c2287bea91b39e4d6033243";
  public list_movie = new Array<any>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient) {
  }

  public ionViewDidLoad() {
    console.log("init ioViewDidLoad Method")
    this.getLatestMovies();
  }

  public getLatestMovies() {
    this.http.get(this.base_url + "/movie/popular?api_key=" + this.api_key).subscribe(data => {
        console.log("getLatestMovies method in Feed.ts");
        const response = (data as any);
        const object_return = JSON.parse(JSON.stringify(response || null));
        this.list_movie = object_return.results;
        console.log(object_return);
        console.log(this.list_movie);

      },
      error => {
        console
          .log(error);

      }
    );
  }

}
