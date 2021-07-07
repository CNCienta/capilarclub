import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

  isLoggedIn = false;

  constructor(
    
    private router: Router,
    private authenticationService: AuthenticationService){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
          
          return this.authenticationService.isLoggedIn();
    
       }
     }
