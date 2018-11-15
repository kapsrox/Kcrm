import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'OfaCrmApp7';
  ngOnInit(){
    $(document).ready(function () {
      $.getScript("assets/app-assets/js/core/app-menu.js");
      $.getScript("assets/app-assets/js/core/app.js");
      
    });
  }
}
