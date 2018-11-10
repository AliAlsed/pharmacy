import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  User = {
    age: '',
    city: '',
    disease: '',
    email: '',
    gender: '',
    name: ''
  }
  constructor(public viewCtrl: ViewController, public navParams: NavParams, public _UsersProvider: UsersProvider) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.data.user);
    this.User.name = this.navParams.data.user.Name;
    this.User.age = this.navParams.data.user.age;
    this.User.city = this.navParams.data.user.city;
    this.User.disease = this.navParams.data.user.disease;
    this._UsersProvider.getUser().then((res: any) => {
      console.log(res);
      this.User.gender = res.gender;
      this.User.email = res.email;
    })
  }
  update(f) {
    this.User.name = f.value.Name;
    this.User.city = f.value.city;
    this.User.disease = f.value.disease;
    this.User.age = f.value.age;
    console.log(this.User);
    this._UsersProvider.updateUser(this.User).then((res) => {
      this.viewCtrl.dismiss();
    }, (error) => {
      console.log(error);
    })
  }
  pop(){
    this.viewCtrl.dismiss();
  }
}
