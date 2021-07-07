import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers = null;
  actions = null;
  
  constructor(private accountService: AccountService) { }


  ngOnInit() {

    this.accountService.getAllcustomers()
    .pipe(first())
    .subscribe(customers => this.customers = customers);

    this.accountService.getAllactions()
    .pipe(first())
    .subscribe(actions => this.actions = actions);

  }

}
