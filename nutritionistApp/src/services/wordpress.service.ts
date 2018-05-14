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
    return this.httpClient.get(Config.WORDPRESS_REST_URL + 'posts?page=' + page).subscribe(res => {
      JSON.parse(JSON.stringify(res || null))
    });
  }

  public getAuthor(author) {
    return this.httpClient.get(Config.WORDPRESS_REST_URL + 'users/' + author).subscribe(res => {
      JSON.parse(JSON.stringify(res || null));
    });


  }

  public getPostCategories(post) {
    let observableBatch = [];
    post.categories.forEach(category => {
      observableBatch.push(this.getCategory(category));
    });
    return Observable.forkJoin(observableBatch);
  }

  public getCategory(category) {
    return this.httpClient.get(Config.WORDPRESS_REST_URL + "categories/" + category).subscribe(res => {
      JSON.parse(JSON.stringify(res || null));
    });
  }
}
