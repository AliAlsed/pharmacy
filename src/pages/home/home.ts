import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  getInfo = {
    email: '',
    userPhoto: ''
  }
  constructor(public navCtrl: NavController,public storage:Storage) { }
  signup() {
    this.navCtrl.push('RegisterPage')
  }
  login() {
    this.navCtrl.push(LoginPage)
  }
  ionViewDidLoad() {
    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot('IntroPage');
      }
    });
  }

}
