import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";
import {ResponseError} from "../../utils/response-error";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  private responseError: ResponseError = new ResponseError();
  public tabBarElement: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastUtil) {
    this.tabBarElement = document.querySelector('.show-tabbar');
  }

  //para eliminar a página de tabs assim que entrar nessa página
  public ionViewDidEnter() {
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

  public register() {
    this.toastCtrl.createToast();
    this.fireAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      this.toastCtrl.setMessage("Registrado com sucesso!");
      console.log("dados do usuário : " + data);
      this.toastCtrl.present();
      this.navCtrl.setRoot(TabsPage);
    }).catch((error: any) => {
      //tratando os tipos de erro para o cadastro firebase
      this.responseError.responseTypeErrorRegister(error, this.toastCtrl)

    });
  }
}
