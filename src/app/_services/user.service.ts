import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/user';
 
@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }
 
    getAll(user) {
        const params = new HttpParams()
        .set('UserID',user.UserID)
        .set('BUID',user.BUID)
        .set('EmpID',user.EmpID)
        .set('SearchVal',user.SearchVal)
        return this.http.get<User[]>(this.baseUrl + '/GetUserList/', {params});
    }
 
    // getById(id: number) {
    //     //return this.http.get(`${config.apiUrl}/users/` + id);
    // }
 
    // register(user: User) {
    //     //return this.http.post(`${config.apiUrl}/users/register`, user);
    // }
 
    // update(user: User) {
    //     //return this.http.put(`${config.apiUrl}/users/` + user.id, user);
    // }
 
    // delete(id: number) {
    //     //return this.http.delete(`${config.apiUrl}/users/` + id);
    // }
}
