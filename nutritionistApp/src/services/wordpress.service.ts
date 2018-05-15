import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as Config from '../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {Observable} from "rxjs/Observable";


@Injectable()
export class WordpressService {

  public constructor(public httpClient: HttpClient) {
  }

  public getRecentPosts(page: number = 1) {
    //return this.httpClient.get(Config.WORDPRESS_REST_URL + 'posts?page=' + page);
    return this.httpClient.get("../../assets/requestRestaurantes.json");
  }

  public getAuthor(author) {
    return this.httpClient.get(Config.WORDPRESS_REST_URL + 'users/' + author);
    // return this.httpClient.get(Config.WORDPRESS_REST_URL + 'users/' + author).map(res => {
    //   JSON.parse(JSON.stringify(res || null));
    // });


  }

  public getPostCategories(post) {
    let observableBatch = [];
    post.categories.forEach(category => {
      observableBatch.push(this.getCategory(category));
    });
    return Observable.forkJoin(observableBatch);
  }

  public getCategory(category) {
    return this.httpClient.get(Config.WORDPRESS_REST_URL + "categories/" + category);
    // return this.httpClient.get(Config.WORDPRESS_REST_URL + "categories/" + category).map(res => {
    //   JSON.parse(JSON.stringify(res || null));
    // });
  }
}
