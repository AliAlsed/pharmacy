import { credientials } from './../../model/credeintials';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  credeintials = {} as credientials;
  constructor(private _FirebaseProvider: FirebaseProvider,
    public navCtrl: NavController,
    public alertCtrl:AlertController) { }

  register() {
    this._FirebaseProvider.createuser(this.credeintials).then(() => {
      this.navCtrl.push('UserInfoPage');
    },(err)=>{
        let alert = this.alertCtrl.create({
        title: 'login',
        subTitle: `${err}`,
        buttons: ['Dismiss']
      });
      alert.present();
    })

  }

}
