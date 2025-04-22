import { Component, OnInit } from '@angular/core';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard/', title: 'Dashboard',  icon: 'design_app', class: '' },
  { path: '/dashboard/offre', title: 'offre Management',  icon:'education_atom', class: '' },
  { path: '/dashboard/user', title: 'user Management',  icon:'location_map-big', class: '' },
  { path: '/dashboard/forum', title: 'forum Management',  icon:'ui-1_bell-53', class: '' },

  { path: '/dashboard/reclamation', title: 'item Management',  icon:'ui-1_bell-53', class: '' },
  { path: '/dashboard/sponsor', title: 'sponsor Management',  icon:'ui-1_bell-53', class: '' },
  { path: '/dashboard/annonce', title: 'announcement Management',  icon:'ui-1_bell-53', class: '' },
  { path: '/dashboard/condidature', title: 'condidature Management',  icon:'ui-1_bell-53', class: '' },


];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
