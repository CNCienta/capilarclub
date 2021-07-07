import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})

export class ProgramsComponent implements OnInit {

  programs = null;
  
  constructor(private accountService: AccountService) { }


  ngOnInit() {

    this.accountService.getAllprograms()
    .pipe(first())
    .subscribe(programs => this.programs = programs);


  }

}