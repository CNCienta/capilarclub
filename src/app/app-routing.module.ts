import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstituteComponent} from './institute/institute.component'
import { LabsComponent} from './labs/labs.component'
import { PartnersComponent} from './partners/partners.component'
import { ProgramsComponent} from './programs/programs.component'
import { HomeComponent} from './home/home.component'
import { RegisterComponent} from './register/register.component'
import { ShopComponent} from './shop/shop.component'

import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { AdminauthGuard } from './_helpers/adminauth.guard';
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [

  { path : '', component: HomeComponent },
  { path : 'home', component: HomeComponent },
  { path : 'shop', component: ShopComponent  },
  { path : 'institute', component: InstituteComponent  },
  { path : 'labs', component: LabsComponent  },
  { path : 'partners', component: PartnersComponent  },
  { path : 'programs', component: ProgramsComponent  },
  { path : 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'adminlogin', component: AdminloginComponent },
  { path : 'admin', component: AdminComponent, canActivate: [AdminauthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path : 'customers', component: CustomersComponent, canActivate: [AuthGuard], loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
