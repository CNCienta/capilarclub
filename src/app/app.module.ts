import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InstituteComponent } from './institute/institute.component';
import { LabsComponent } from './labs/labs.component';
import { PartnersComponent } from './partners/partners.component';
import { ProgramsComponent } from './programs/programs.component';
import { HomeComponent } from './home/home.component';
import { HomeBenefitsComponent } from './home-benefits/home-benefits.component';
import { SocialComponent } from './social/social.component';
import { LoginComponent } from './login/login.component';
import { CookieLawModule } from 'angular2-cookie-law';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AdminModule } from './admin/admin.module';
import { CustomersModule } from './customers/customers.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { RegisterComponent } from './register/register.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ShopComponent } from './shop/shop.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    InstituteComponent,
    LabsComponent,
    PartnersComponent,
    ProgramsComponent,
    HomeBenefitsComponent,
    SocialComponent,
    LoginComponent,
    AdminloginComponent,
    RegisterComponent,
    ShopComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CookieLawModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    CustomersModule,
    ChartsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot(),
    NgbModule

  ],

  providers: [

    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },


  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
