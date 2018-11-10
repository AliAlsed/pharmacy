import { Component } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  constructor(public fb:FirebaseProvider) {
  }

  ionViewDidLoad() {
  }
  reset(form){
    this.fb.resetPassword(form.value.email);
  }

}
