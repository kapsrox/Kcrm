import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  baseUrl = environment.baseUrl; 
  constructor(private http: HttpClient) { }
  login(username:string, password:string) {
    return this.http.post<any>(this.baseUrl + '/OfaLoginAngular',{ UserName:username, Password: password })
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user.result.user && user.result.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user.result.user));
        localStorage.setItem('MenuList', JSON.stringify(user.result.MenuList));
        localStorage.setItem('ExcludedList', JSON.stringify(user.result.ExcludedList));
        localStorage.setItem('Token', JSON.stringify(user.result.token));
      }

      return user;  
    }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('MenuList');
    localStorage.removeItem('ExcludedList');
    localStorage.removeItem('Token');  
  }
}
