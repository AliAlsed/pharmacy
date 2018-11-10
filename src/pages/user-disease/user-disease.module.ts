import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDiseasePage } from './user-disease';

@NgModule({
  declarations: [
    UserDiseasePage,
  ],
  imports: [
    IonicPageModule.forChild(UserDiseasePage),
  ],
})
export class UserDiseasePageModule {}
