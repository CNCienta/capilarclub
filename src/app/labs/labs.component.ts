import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})

export class LabsComponent implements OnInit {

  labs = null;
  
  constructor(private accountService: AccountService) { }


  ngOnInit() {

    this.accountService.getAlllabs()
    .pipe(first())
    .subscribe(labs => this.labs = labs);


  }

}