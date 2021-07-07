import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})

export class PartnersComponent implements OnInit {

  partners = null;
  
  constructor(private accountService: AccountService) { }


  ngOnInit() {

    this.accountService.getAllpartners()
    .pipe(first())
    .subscribe(partners => this.partners = partners);


  }

}
