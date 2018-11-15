import { environment } from './../../environments/environment.prod';
import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {HeaderComponent} from '../header/header.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { PreviousRouteService } from '../_services/previous-route.service';


class Person {
  id: number;
  firstName: string;
  lastName: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@NgModule({

  declarations: [HeaderComponent, SidebarComponent, FooterComponent]
})
export class DashboardComponent implements OnInit {
  baseUrl = environment.baseUrl; 
  dtOptions: DataTables.Settings = {};
  persons: Person[];
  userData = { token: '', entryid : '' };
  constructor(public iziToast: Ng2IzitoastService, private routestate: PreviousRouteService, private http: HttpClient) { }
  ngOnInit() {
    const that = this;
    this.routestate.getPreviousUrl();
    console.log(this.routestate.getPreviousUrl());
   this.iziToast.success({ title: "welcome" });

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 2,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      that.http
        .post<DataTablesResponse>(
          this.baseUrl + '/GetLeadList/', Object.assign(dataTablesParameters,this.userData)
          , {}
        ).subscribe(resp => {
          that.persons = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      }
    }
  }  
}