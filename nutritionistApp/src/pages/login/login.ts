import {Component, ViewChild} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {AngularFireAuth} from "angularfire2/auth";
import {Users} from "./users";
import {Constants} from "../../utils/constants";
import {ChangePasswordPage} from "../change-password/change-password";
//importando firebase para fazer login com o facebook
import firebase from "firebase";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";
import {ResponseError} from "../../utils/response-error";
import {TabsPage} from "../tabs/tabs";


@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class HomePage {
  users: Users = new Users();
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  private constants: Constants = new Constants();
  private responseError: ResponseError = new ResponseError();
  public tabBarElement: any;

  constructor(public navCtrl: NavController,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastUtil, public platform: Platform) {
    this.tabBarElement = document.querySelector('.show-tabbar');
  }

  //para eliminar a pagina de tasb
  public ngAfterViewInit() {
    this.cleanToTabPage();
  }

  //para eliminar a página de tabs quando fazer logout
  public ionViewWillLeave() {
    this.cleanToTabPage();
  }

  public cleanToTabPage() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  //método abre um pop up para entrar com a conta do facebook
  public loginWithFacebook() {
    console.log(this.platform._platforms);
    this.toastCtrl.createToast();
    if (this.platform.is('android')
      || this.platform.is('ios')
      || this.platform.is('mobile') || this.platform.is('windows')) {
      console.log("android");
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(() => {
        firebase.auth().getRedirectResult().then((result) => {
          console.log("User facebook device : ", result);
          this.navCtrl.setRoot(TabsPage);
        }).catch(function (error) {
          alert(JSON.stringify(error));
        })
      })
    }

    else {
      console.log("coreeee web");
      this.fireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(data => {
        console.log("User facebook core : ", data);
        this.navCtrl.setRoot(TabsPage);
      }).catch((error: any) => {
        console.log(error);
      });
    }

  }


  public login() {
    this.toastCtrl.createToast();
    console.log("Usuário digitado foi: " + this.email.value);
    console.log("A senha digitada foi: " + this.password.value);
    this.fireAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      console.log("dados - login com sucesso : ", data);
      this.users.email = this.email;
      this.users.password = this.password;
      this.toastCtrl.setMessage(this.constants.USER_LOGIN_SUCCESS);
      this.toastCtrl.present();
      this.navCtrl.setRoot(TabsPage);

    }).catch((error: any) => {
      this.responseError.responseTypeErrorLogin(error, this.toastCtrl);
    });
  }

  public loginWithVisitor() {
    this.toastCtrl.createToast();
    this.fireAuth.auth.signInAnonymously().then((data => {
      this.toastCtrl.setMessage(this.constants.LOGIN_VISITOR);
      this.toastCtrl.present();
      this.navCtrl.setRoot(TabsPage);
    })).catch((error: any) => {
      console.log(error);
    });
  }

  public changePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }

  public register() {
    this.navCtrl.push(RegisterPage);
  }

}
