import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders = null;
  actions = null;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.accountService.getAllorders()
    .pipe(first())
    .subscribe(orders => this.orders = orders);

    this.accountService.getAllactions()
    .pipe(first())
    .subscribe(actions => this.actions = actions);

  }

}
