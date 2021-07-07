import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products = null;

  constructor(
    
    private accountService: AccountService
    
    ) { }

  ngOnInit(): void {

    this.accountService.getAllproducts()
    .pipe(first())
    .subscribe(products => this.products = products);

  }

}
