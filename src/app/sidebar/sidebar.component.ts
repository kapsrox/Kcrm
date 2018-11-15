import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit  {

  MenuList = JSON.parse(localStorage.getItem('MenuList'));
  MenuListNew = [];
  router;
  order = "OrderbyMenu";
  ascending = false;
  //order: string = 'Menu.OrderbyMenu';
  
  constructor(private _router: Router) {
    this.router = _router;
    
  }

  ngOnInit() {
    //$(document).ready(function () {
      
      
    //});
    for (var i = 0; i < this.MenuList.length; i++) {
        if (this.MenuList[i].ParentID == 0) {
          this.MenuListNew.push(this.MenuList[i]);
          this.MenuListNew[this.MenuListNew.length - 1].child = [];
        } else if (this.MenuList[i].ParentID != 0) {
            for (var j = 0; j < this.MenuListNew.length; j++) {
                if (this.MenuListNew[j].ModID == this.MenuList[i].ParentID) {
                  this.MenuListNew[j].child.push(this.MenuList[i]);
                  this.MenuListNew[j].ModBaseUrl = "#";
                }
            }
        }
    }
  }
  
  whatClassIsIt (length, id) {
    if (length == 0) {
        $("#Menu_" + id).removeClass("has-sub");
    }

    return true;
  } 

  isActive  (viewLocation) {
    var active = (viewLocation.toLowerCase().includes(this.router.url.toLowerCase()));
    return active;
  }
}
