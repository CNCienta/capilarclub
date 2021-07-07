import { Component, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { AuthenticationService } from '../../services/authentication.service';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  admin: Admin;

  constructor(

    private authenticationService: AuthenticationService,
    private accountService: AccountService,

  ) { 

    this.admin = this.authenticationService.adminValue;
    this.admin = this.accountService.adminValue;

  }

  ngOnInit(): void {

    this.authenticationService.getadmin()
    

  }

}