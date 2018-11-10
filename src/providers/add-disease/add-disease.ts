import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AddDiseaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddDiseaseProvider {
   firestorage = firebase.storage();
   firestore = firebase.database().ref('/disease');
   fireall= firebase.database().ref('/alldisease')


  constructor(public platform:Platform,public afireauth: AngularFireAuth) {
  }
  addDisease(disease){
    var promise = new Promise((resolve) => {
      this.firestore.child(this.afireauth.auth.currentUser.uid).push(disease).then((res) => {
        this.fireall.child(disease.city).child(res.key).set(disease);
        }).then(()=>{
          resolve({ success: true });
        })
})
return promise;
  }
  getDisease():firebase.database.Reference{
    return this.firestore.child(this.afireauth.auth.currentUser.uid)
  }
  deleteDisease(id,city):Promise<any>{
    console.log(id,city);
    return this.firestore.child(`${this.afireauth.auth.currentUser.uid}/${id}`).remove().then(()=>{
      this.fireall.child(`${city}/${id}`).remove();
      console.log(city);
    })
  }
  getAllDisease(city):firebase.database.Reference{
      return this.fireall.child(city)
  }

/*
 var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;



*/

  }


