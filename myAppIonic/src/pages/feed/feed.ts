import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {MovieProvider} from "../../providers/movie/movie";
import {HttpClient} from "@angular/common/http";
import {MovieDetailsPage} from "../movie-details/movie-details";

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
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController) {
  }

  //metodo ionViewDidLoad carrega a página uma vez.
  //método ionViewDidEnter a página sempre será carregada quando for acessada.
  public ionViewDidEnter() {
    console.log("init ioViewDidLoad Method")
    this.getLatestMovies(this.page);
  }

  //função para carregar os filmes de acordo com o tempo de resposta do servidor.
  public presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  public closeLoading() {
    this.loader.dismiss();
  }

  public getLatestMovies(page = 1, new_page: boolean = false) {
    this.presentLoading();
    //para adicionar um valor(page) na url usa aspas ``.
    this.http.get(this.base_url + `/movie/popular?page=${page}&api_key=` + this.api_key).subscribe(data => {
        const response = (data as any);
        const object_return = JSON.parse(JSON.stringify(response || null));
        if (new_page) {
          this.list_movie = this.list_movie.concat(object_return.results);
          this.infiniteScroll.complete();
          console.log(this.list_movie);
          console.log("page: " + this.page);
        } else {
          this.list_movie = object_return.results;
        }
        //console.log(object_return);
        console.log(this.list_movie);
        this.closeLoading();
        this.completeRefresher();
      },
      error => {
        console
          .log(error);
        this.closeLoading();
        this.completeRefresher();

      }
    );
  }

  //método inicial que faz o refresh na página de filmes
  public doRefresh(refresher) {
    this.refresher = refresher;
    console.log('Begin async operation', refresher);
    this.isRefreshing = true;
    this.getLatestMovies(this.page);
  }

  public completeRefresher() {
    if (this.isRefreshing) {
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

  public openDetailsMovies(movies) {
    console.log("Open details movie");
    console.log(movies);
    //enviando o id do filme para a página MovieDetails.
    this.navCtrl.push(MovieDetailsPage, {id: movies.id});
  }

  //método que faz o scroll para requisitar mais dados no final da tela.
  public doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    console.log('infinity scroll');
    this.getLatestMovies(this.page, true)


  }

}
