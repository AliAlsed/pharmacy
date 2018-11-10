import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  user = {
    key: firebase.auth().currentUser.uid,
    name: '',
    gender: '',
    age: '',
    email: firebase.auth().currentUser.email,
    disease: ''
  }
  constructor(public navCtrl: NavController,
    private fb: FirebaseProvider,
    private store: Storage) {
  }

  ionViewDidLoad() {
    //image
  }
  add(f) {
    this.user.name = f.value.name;
    this.user.age = f.value.age;
    this.user.disease = f.value.disease;
    this.user.gender = f.value.gender;
    console.log(this.user);
    this.store.set('myPerson', this.user);

    this.fb.adduser(this.user).then((userinfo) => {
      this.navCtrl.push(TabsPage);
    })
  }

}
