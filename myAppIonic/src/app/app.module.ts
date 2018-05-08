import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {FeedPageModule} from '../pages/feed/feed.module';
import {IntroPageModule} from '../pages/intro/intro.module'

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MovieProvider} from '../providers/movie/movie';
import {HttpClientModule} from "@angular/common/http";
import {ConfigurationsPageModule} from "../pages/configurations/configurations.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {AboutPageModule} from "../pages/about/about.module";
import {MovieDetailsPageModule} from "../pages/movie-details/movie-details.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FeedPageModule,
    IntroPageModule,
    HttpClientModule,
    ConfigurationsPageModule,
    ProfilePageModule,
    AboutPageModule,
    MovieDetailsPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieProvider
  ]
})
export class AppModule {
}
