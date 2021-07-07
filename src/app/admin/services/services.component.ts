import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services = null;
  actions = null;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.accountService.getAllservices()
    .pipe(first())
    .subscribe(services => this.services = services);

    this.accountService.getAllactions()
    .pipe(first())
    .subscribe(actions => this.actions = actions);


  }

}
