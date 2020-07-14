import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { SecureAuth } from '../../helpers/secure-auth';
import { SubnavItems } from '../../_sub_nav'


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {
  public navItem = new Array();
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  _secureAuth: SecureAuth;
  _userDetails: any;
  _decryptedUser: any;
  public SubnavItems = SubnavItems;
  constructor(private router: Router, @Inject(DOCUMENT) _document?: any) {
    this._secureAuth = new SecureAuth();
    this._userDetails = {
      id: '',
      FirstName: '',
      LastName: '',
      EmailId: '',
      UserType: '',
      userImage: ''
    }
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    this.navItem = [];
  }

  ngOnInit() {
    this.GetUserDetails();
    this.getNavItemsPerRole();
  }

  getNavItemsPerRole = () => {
    let role = this._userDetails.UserType;
    if (role === "Super Admin") {
      this.navItem = [];
      for (let i = 0; i < navItems.length; i++) {
        if (navItems[i].name === 'Dashboard') {
          this.navItem.push(navItems[i]);
        } else if (navItems[i].name === 'Business Owners') {
          this.navItem.push(navItems[i]);
        } else if (navItems[i].name === 'Users') {
          this.navItem.push(navItems[i]);
        }
      }
    }
    if (role === 'Admin') {
      this.navItem = [];
      for (let i = 0; i < navItems.length; i++) {
        if (navItems[i].name === 'Business Owners') {

        } else if (navItems[i].name === 'Users') {

        } else {
          this.navItem.push(navItems[i]);
        }
      }
    }
  }

  GetUserDetails() {
    const user = sessionStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    this._userDetails.id = parsedUser.id
    this._userDetails.FirstName = parsedUser.first_name;
    this._userDetails.LastName = parsedUser.last_name;
    this._userDetails.EmailId = parsedUser.email;
    this._userDetails.UserType = parsedUser.usersType.type;
    this._userDetails.userImage = (parsedUser.avatar_uri === null || parsedUser.avatar_uri === '' || parsedUser.avatar_uri === undefined) ? 'assets/img/avatars/3.jpg' : parsedUser.avatar_uri;
  }

  gotoProfile() {
    this.router.navigate([`/manage/profile/${this._userDetails.id}`]);
  }

  logMeOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
