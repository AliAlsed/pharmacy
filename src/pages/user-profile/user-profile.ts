import { Component} from '@angular/core';
import { IonicPage, LoadingController, App, ModalController, AlertController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';
import { UpdateProfilePage } from '../update-profile/update-profile';
import {Storage} from '@ionic/storage';
import { CameraOptions, Camera } from '@ionic-native/camera';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage{
  profileImage;
  userPhoto;
  currentPhoto;
  addImage = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  firestore = firebase.storage();
  firedata = firebase.database().ref('/userimages');

  User={
    Name:'',
    age:'',
    disease:''
  }
  constructor(private fr:FirebaseProvider,
    public UserProvider:UsersProvider,
    private loadingCtrl:LoadingController,
    private app:App,
     private modal:ModalController,
     public storage:Storage,
     public camera:Camera,
     public alertCtrl:AlertController) {
     this.loader.present();
    }
    loader = this.loadingCtrl.create({
      content: 'Please wait'
    });

  ionViewDidLoad() {

        this.UserProvider.getUser().then((res:any)=>{
          if(res !=null){
          this.User.Name=res.name;
          this.User.age=res.age;
          this.User.disease=res.disease;
          }
          //this.loader.dismiss();
        }).then(()=>{
          this.UserProvider.getUserImage().then((res:any)=>{
            if(res != null){
              this.profileImage=res.image;
            }
          })
        }).then(()=>{
          this.loader.dismiss();
        })
  }

  update(){
    let mdl=this.modal.create(UpdateProfilePage,{user:this.User});
    mdl.present();
  }

  logout(){
    this.fr.logoutUser();
    this.app.getRootNav().setRoot(HomePage)
  }
  doRefresh(refresher) {

        this.UserProvider.getUser().then((res:any)=>{
          this.User.Name=res.name;
          this.User.age=res.age;
          this.User.disease=res.disease;
          //this.loader.dismiss();
        }).then(()=>{
          this.UserProvider.getUserImage().then((res:any)=>{
            if(res != null){
            console.log(res)
            }
          })
        }).then(()=>{
          this.loader.dismiss();
        })

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  chooseimage(){
    const galleryOptions: CameraOptions = {
      quality:95,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType:this.camera.EncodingType.JPEG,
      targetWidth: 720,
      targetHeight: 720,
      correctOrientation: true
    }
    this.camera.getPicture(galleryOptions).then((imageData) => {
      this.loader.present();
      this.userPhoto = this.dataUrltoBlob('data:image/jpeg;base64,' + imageData);
      this.upload();

    }, (error) => {
      // upload failed
      let alert = this.alertCtrl.create({
        title: 'imgSource',
        subTitle: `${error}`,
        buttons: ['Dismiss']
      });
      alert.present();
    })
  }
  dataUrltoBlob(url) {
    let binary = atob(url.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }
  upload() {
    if (this.userPhoto) {
      this.loader.dismiss();
      firebase.storage().ref().child(`/userimages/${firebase.auth().currentUser.uid}`)
      .put(this.userPhoto).then((snapshot) => {
        this.currentPhoto = snapshot.downloadURL;
        this.getMyUrl();
        this.loader.dismiss();
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: 'imgSource',
          subTitle: `${err}`,
          buttons: ['Dismiss']
        });
        alert.present();
        this.loader.dismiss();
      });
    }
  }
  getMyUrl() {
    firebase.storage().ref().child(`/userimages/${firebase.auth().currentUser.uid}`)
    .getDownloadURL().then((url) => {
      this.profileImage = url;
      if(url !=null && url != undefined){
        this.UserProvider.addUserImage(this.profileImage);
        let alert = this.alertCtrl.create({
        title: 'imgSource',
        subTitle: 'تم رفع الصوره',
        buttons: ['Dismiss']
      });
      alert.present();
      }

    });
  }
  about(){
    this.app.getRootNav().push('AboutUsPage');
  }


  }


