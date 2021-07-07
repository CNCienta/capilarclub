import { NgModule, LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AddEditWorkerComponent } from './add-edit-worker/add-edit-worker.component';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkersComponent } from './workers/workers.component';
import { CustomersComponent } from './customers/customers.component';
import { MainComponent } from './main/main.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ServicesComponent } from './services/services.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ChartsModule } from 'ng2-charts';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AdminComponent,
    AddEditWorkerComponent,
    AddEditCustomerComponent,
    CalendarComponent,
    DashboardComponent,
    WorkersComponent,
    CustomersComponent,
    MainComponent,
    ServicesComponent,
    OrdersComponent,
    ProductsComponent

  ],
  imports: [
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ChartsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot(),
    
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'}, ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }