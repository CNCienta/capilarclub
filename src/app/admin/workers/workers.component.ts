import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  workers = null;
  actions = null;
  
  constructor(private accountService: AccountService) { }


  ngOnInit() {

    this.accountService.getAllworkers()
    .pipe(first())
    .subscribe(workers => this.workers = workers);

    this.accountService.getAllactions()
    .pipe(first())
    .subscribe(actions => this.actions = actions);

  }

}
