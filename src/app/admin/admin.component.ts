import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  
})
export class AdminComponent implements OnInit {

  admin: Admin;

  constructor(
    
    private authenticationService: AuthenticationService, 
    private router: Router
    
    
    ) { 

      this.admin = this.authenticationService.adminValue;


    }
  
    ngOnInit(): void {

      
    }

    adminlogout(){
      this.authenticationService.adminlogout();
      this.router.navigateByUrl('/adminlogin');
    }
  
    readUrl(event:any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.onload = (event:any) => {
        
        }
  
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  
  }




