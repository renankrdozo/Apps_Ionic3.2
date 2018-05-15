import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/login/login';
import {DicasPageModule} from "../pages/dicas/dicas.module";
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {RegisterPageModule} from '../pages/register/register.module';
import {ChangePasswordPageModule} from "../pages/change-password/change-password.module";
import {ToastUtil} from '../providers/toast-ctrl/toast-util.service';
import {ProfilePageModule} from "../pages/profile/profile.module";
import {WordpressService} from "../services/wordpress.service";
import {HttpClientModule} from "@angular/common/http";
import {PostPageModule} from "../pages/postpage/postpage.module";
import {ChatPageModule} from "../pages/chat/chat.module";


const firebaseConfig = {
  apiKey: "AIzaSyA4J0lxdIaYf9Az8sHKaN2SiA7HXER9SpA",
  authDomain: "deliveryapp-5aef4.firebaseapp.com",
  databaseURL: "https://deliveryapp-5aef4.firebaseio.com",
  projectId: "deliveryapp-5aef4",
  storageBucket: "deliveryapp-5aef4.appspot.com",
  messagingSenderId: "133283939270"
};

//https://sujeitoprogramador.com/nutriapp/wp-json/wp/v2/posts

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DicasPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    RegisterPageModule,
    ChangePasswordPageModule,
    ProfilePageModule,
    HttpClientModule,
    PostPageModule,
    ChatPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastUtil,
    WordpressService
  ]
})
export class AppModule {
}
