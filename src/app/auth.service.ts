import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, RouterState } from '@angular/router';

@Injectable()
export class Auth implements CanActivate{
    //_routerState:{};
  constructor(private router: Router, private routed: ActivatedRoute) {  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
        var MenuLists = JSON.parse(localStorage.getItem('MenuList'));
        var path = state.url;
        var redirectDashboard = false;
        for (var i = 0; i < MenuLists.length; i++) {
          console.log(MenuLists[i].ModBaseUrl);
            if(MenuLists[i].ModBaseUrl === path || path.includes(MenuLists[i].ModBaseUrl)){               
                return true;
            }
        }
        
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
}
}
