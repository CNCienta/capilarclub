import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WorkersComponent } from './workers/workers.component';
import { CustomersComponent } from './customers/customers.component';
import { ServicesComponent } from './services/services.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'workers', component: WorkersComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
