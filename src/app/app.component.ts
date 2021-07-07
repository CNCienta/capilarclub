import { Component,OnInit  } from '@angular/core';
import { Customer } from './models/customer';
import { Admin } from './models/admin';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'capilarclubcom';

  customer: Customer;
  admin: Admin;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.customer.subscribe(x => this.customer = x);
    this.authenticationService.admin.subscribe(x => this.admin = x);
}



logout() {
    this.authenticationService.logout();
}

ngOnInit(): void {
} 

}
  


