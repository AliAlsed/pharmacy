import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { UserProfilePage } from '../user-profile/user-profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UserProfilePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
