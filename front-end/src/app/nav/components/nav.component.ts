import { Component } from '@angular/core';

import * as jQuery from 'jquery';
declare var $ :any;

@Component({
  selector: 'app-nav',
  templateUrl: '../views/nav.component.html',
  styleUrls: ['../styles/nav.component.scss']
})
export class NavComponent {

  toggleSideBar(){
    if (!$('body').hasClass('sidebar-hidden')) {
			$('body').addClass('sidebar-hidden');
		} else {
			$('body').removeClass('sidebar-hidden');
		}
  }
}
