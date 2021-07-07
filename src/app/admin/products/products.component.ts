import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = null;
  actions = null;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.accountService.getAllproducts()
    .pipe(first())
    .subscribe(products => this.products = products);

    this.accountService.getAllactions()
    .pipe(first())
    .subscribe(actions => this.actions = actions);

  }

  }


