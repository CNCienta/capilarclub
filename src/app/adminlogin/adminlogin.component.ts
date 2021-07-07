﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';


@Component({ 
  
  templateUrl: 'adminlogin.component.html',
  styleUrls: ['adminlogin.component.css']

})
export class AdminloginComponent implements OnInit {
    adminloginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
    ) {}

    ngOnInit() {
        this.adminloginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.router.navigate(['/admin']);

       // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    

    // convenience getter for easy access to form fields
    get f() { return this.adminloginForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.adminloginForm.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.adminlogin(this.f.username.value, this.f.password.value,)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/admin']);
                },
                error => {
                    this.loading = false;
                    this.router.navigate(['/adminlogin']);
                });
    }
}