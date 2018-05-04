import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {List} from "ionic-angular";
import {a} from "@angular/core/src/render3";

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private base_url: String = "https://api.themoviedb.org/3";
  private api_key: String = "2e3c87513c2287bea91b39e4d6033243";
  public list_moovie: Array<any> = new Array<any>();


  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  get bar(): boolean {
    return false;
  }

  public getLatestMovies() {
    this.http.get(this.base_url + "/movie/popular?api_key=" + this.api_key).subscribe(data => {
        console.log(this.list_moovie = data.results);

      },
      error => {
        console
          .log(error);

      }
    );

  }

}
