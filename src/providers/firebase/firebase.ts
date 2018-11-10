import { credientials } from './../../model/credeintials';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  constructor(public afireauth: AngularFireAuth){}
  firedata = firebase.database().ref('/users');
  getAuthintecatedUser():any{
    return firebase.auth().currentUser;
  }

  adduser(user) {
    var promise = new Promise((resolve, reject) => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            name: user.name,
            gender:user.gender,
            age:user.age,
            email:user.email,
            disease:user.disease
          }).then(() => {
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
          })
    })
    return promise;
  }
  createuser(user:credientials) :Promise<void>{

    return firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then((res)=>{
      console.log(res)
    })
  }




  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
  signin(user:credientials):Promise<void>{
     return firebase.auth().signInWithEmailAndPassword(user.email,user.password).then((res)=>{
       console.log(res)
     })
  }
  resetPassword(email:string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email).then((res)=>{
      console.log(res);
    });
  }
}
