import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component'
import { CustomersRoutingModule } from './customers-routing.module'
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';


@NgModule({
  declarations: [
    CustomersComponent,
    StripePaymentComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot(),

  ],
  bootstrap: [CustomersComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  
})

export class CustomersModule{ }
