import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticateService } from '../_services/authenticate.service';
import { PreviousRouteService } from '../_services/previous-route.service';
//import { RoutingStateService } from '../_services/routing-state.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm:FormGroup;
  loading = false;
  submitted = false;
  returnUrl:string;
  previousRoute: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private routingState: PreviousRouteService,
    private authenticateService: AuthenticateService,
    ) {

      this.LoginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    }
  ngOnInit() {
   // reset login status
   //this.authenticateService.logout();
   //this.previousRoute = this.routingState.getPreviousUrl();
   // get return url from route parameters or default to '/'
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
   if(localStorage.getItem('currentUser'))
   {
    this.router.navigate([this.previousRoute]);
   }
  }
  // convenience getter for easy access to form fields
  get f() { return this.LoginForm.controls; }
  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.LoginForm.invalid) {
          return;
      }
      this.loading = true;
      this.authenticateService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                if (localStorage.getItem('currentUser')) {
                    // logged in so return true
                    var MenuLists = JSON.parse(localStorage.getItem('MenuList'));
                    var path = "/dashboard";
                    var redirectDashboard = false;
                    for (var i = 0; i < MenuLists.length; i++) {
                        if(MenuLists[i].ModBaseUrl === path && redirectDashboard == false){               
                            redirectDashboard = true;
                        }
                    }
                        if (redirectDashboard) {
                            //return true;                
                        } else {
                            var tempVar = [];
                            MenuLists.forEach( function (val, key) {
                                if (val.ModBaseUrl != "#") {
                                    this.push(val.ModBaseUrl);
                                }
                            }, tempVar);
                            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || tempVar[0];  
                        }
                }
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.loading = false;
              });
  }
}