import { Component } from '@angular/core';
import { ModalController, IonicPage, App } from 'ionic-angular';
import { AddDiseaseProvider } from '../../providers/add-disease/add-disease';






@IonicPage()
@Component({
  selector: 'page-userdisease',
  templateUrl: 'user-disease.html',
})
export class UserDiseasePage {
  diseaseList: Array<any>;
  constructor(public app: App,
    public _AddDiseaseProvider: AddDiseaseProvider,
    public modalCtrl: ModalController
  ) { }

  ionViewDidLoad() {
    this._AddDiseaseProvider.getDisease().on("value", snapshot => {
      console.log(snapshot)
      this.diseaseList = [];
      snapshot.forEach(snap => {
        console.log(snap.val());
        console.log(snap.key);
        this.diseaseList.push({
          id: snap.key,
          image: snap.val().photo,
          treatment: snap.val().treatment,
          country: snap.val().country,
          quantity: snap.val().quantity,
        })
        console.log(this.diseaseList)
      });
      return false;
    })
  }

  remove(id, city) {
    this._AddDiseaseProvider.deleteDisease(id, city);
  }
  doRefresh(refresher) {
    this._AddDiseaseProvider.getDisease().on("value", snapshot => {
      console.log(snapshot)
      this.diseaseList = [];
      snapshot.forEach(snap => {
        console.log(snap.val());
        console.log(snap.key);
        this.diseaseList.push({
          id: snap.key,
          image: snap.val().photo,
          treatment: snap.val().treatment,
          country: snap.val().country,
          quantity: snap.val().quantity
        })
        console.log(this.diseaseList)
      });
      return false;
    })

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
