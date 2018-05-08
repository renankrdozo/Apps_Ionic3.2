import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {AboutPage} from "../about/about";

/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configurations.html',
})
export class ConfigurationsPage {
  rootPage = ProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  //Metodo usado para ir a uma página
  public openProfile() {
    this.navCtrl.push(ProfilePage);
  }

  public openAbout() {
    this.navCtrl.push(AboutPage);
  }
}
