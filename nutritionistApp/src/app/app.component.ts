import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {HomePage} from "../pages/login/login";
import {AngularFireAuth} from "angularfire2/auth";
import {DicasPage} from "../pages/dicas/dicas";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              fireAuth: AngularFireAuth) {

    const authObserver = fireAuth.authState.subscribe(users => {
      this.checkingLoggedInUser(users, authObserver)
    })


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  //verificando se o usuário esta logado para não exibir a tela de login.
  private checkingLoggedInUser(users: any, authObserver: any) {
    if (users) {
     // this.rootPage = DicasPage;
     this.rootPage = DicasPage;
      authObserver.unsubscribe();
    } else {
      this.rootPage = HomePage;
      authObserver.unsubscribe();
    }
  }
}

