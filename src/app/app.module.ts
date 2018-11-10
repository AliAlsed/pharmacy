import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { UsersProvider } from '../providers/users/users';
import { IonicStorageModule } from '@ionic/storage';
import { AddDiseaseProvider } from '../providers/add-disease/add-disease';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { LoginPage } from '../pages/login/login';
import { FormsModule } from '@angular/forms';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { Geolocation } from '@ionic-native/geolocation';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import {
  GoogleMaps,
  GoogleMap,
} from '@ionic-native/google-maps';
import { fire } from './firebase.config';
import { UserProfilePage } from '../pages/user-profile/user-profile';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    UserProfilePage,
    UpdateProfilePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fire),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    UserProfilePage,
    ResetPasswordPage,
    UpdateProfilePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    Geolocation,
    GoogleMaps ,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    Camera,
    Storage,
    AddDiseaseProvider,
  ]
})
export class AppModule {}
