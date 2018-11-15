import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { DataTablesModule } from 'angular-datatables';
import { Ng2IziToastModule } from 'node_modules/ng2-izitoast';
import { Auth } from './auth.service';

import { AuthenticateService } from './_services/authenticate.service';
import { UserService } from './_services/user.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PreviousRouteService } from './_services/previous-route.service';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    Ng2IziToastModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [Auth, AuthenticateService, UserService,PreviousRouteService,
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
