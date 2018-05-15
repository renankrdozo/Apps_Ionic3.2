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
  apiKey: "AIzaSyAL9CJ3KF5LZbTXKUxpl6SLmRUDnBS-CVs",
  authDomain: "nutritionist-ionic.firebaseapp.com",
  databaseURL: "https://nutritionist-ionic.firebaseio.com",
  projectId: "nutritionist-ionic",
  storageBucket: "nutritionist-ionic.appspot.com",
  messagingSenderId: "643026165879"
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
