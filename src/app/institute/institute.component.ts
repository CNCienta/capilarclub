import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']
})

export class InstituteComponent implements OnInit {

  institutes = null;
  
  constructor(private accountService: AccountService) { }


  ngOnInit() {

    this.accountService.getAllinstitutes()
    .pipe(first())
    .subscribe(institutes => this.institutes = institutes);


  }

}
