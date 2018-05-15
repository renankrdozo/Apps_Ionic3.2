import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {HomePage} from "../login/login";
import {ToastUtil} from "../../providers/toast-ctrl/toast-util.service";
import {Constants} from "../../utils/constants";


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild('content') content: any;
  public facebook = {
    nome: "",
    fotoUrl: ""
  }
  public message: string = "";
  public messages = [];
  private constants: Constants = new Constants();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth: AngularFireAuth,
              public toastCtrl: ToastUtil) {
    this.facebook.nome = fireAuth.auth.currentUser.displayName;
    console.log("NAME USER " + this.facebook.nome);
    this.getMessages();
  }

  public getMessages() {
    var msg = firebase.database().ref().child("messages");
    msg.on("value", (snap) => {
      var data = snap.val();
      this.messages = [];
      for (var key in data) {
        this.messages.push(data[key]);
      }
      this.scrollToBottom();
    });
  }

  public scrollToBottom() {
    var contentEnd = document.getElementById("content-end").offsetTop;
    this.content.scrollTo(0, contentEnd, 300);

  }

  public sendMessage() {
    var msg = firebase.database().ref().child("messages");
    msg.push({message: this.message, nome: this.facebook.nome});
    this.message = "";
  }

  public logout() {
    this.toastCtrl.createToast();
    this.fireAuth.auth.signOut();
    this.toastCtrl.setMessage(this.constants.MESSAGE_LOGOUT);
    this.toastCtrl.present();
    this.navCtrl.setRoot(HomePage);
  }

}
