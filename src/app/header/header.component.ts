import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../_services/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private Auth:AuthenticateService, private route:Router) { }
  logout()
    {
      this.Auth.logout();
      this.route.navigate(["/login"]);
    }
  ngOnInit() {
    
  }

}
