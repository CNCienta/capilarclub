import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Admin } from '../models/admin';
import { map,tap } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { Worker } from '../models/worker';
import { Product } from '../models/product';
import { Appointment } from '../models/appointment';
import { Order } from '../models/order';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    redirectUrl: string;
    
    private adminSubject: BehaviorSubject<Admin>;
    public admin: Observable<Admin>;

    private customerSubject: BehaviorSubject<Customer>;
    public customer: Observable<Customer>;

    private workerSubject: BehaviorSubject<Worker>;
    public worker: Observable<Worker>;

    private productSubject: BehaviorSubject<Product>;
    public product: Observable<Product>;

    private appointmentSubject: BehaviorSubject<Appointment>;
    public appointment: Observable<Appointment>;

    private orderSubject: BehaviorSubject<Order>;
    public order: Observable<Order>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

        this.adminSubject = new BehaviorSubject<Admin>(null);
        this.admin = this.adminSubject.asObservable();

        this.customerSubject = new BehaviorSubject<Customer>(null);
        this.customer = this.customerSubject.asObservable();

        this.workerSubject = new BehaviorSubject<Worker>(null);
        this.worker = this.workerSubject.asObservable();

        this.productSubject = new BehaviorSubject<Product>(null);
        this.product = this.productSubject.asObservable();

        this.appointmentSubject = new BehaviorSubject<Appointment>(null);
        this.appointment = this.appointmentSubject.asObservable();

        this.orderSubject = new BehaviorSubject<Order>(null);
        this.order = this.orderSubject.asObservable();
    }

    public get adminValue(): Admin {
        return this.adminSubject.value;
    }

    public get customerValue(): Customer {
        return this.customerSubject.value;
    }

    public get workerValue(): Worker {
        return this.workerSubject.value;
    }

    public get productValue(): Product {
        return this.productSubject.value;
    }

    public get appointmentValue(): Appointment {
        return this.appointmentSubject.value;
    }

    public get orderValue(): Order {
        return this.orderSubject.value;
    }

    
    login(customername: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/customers/authenticate`, { customername, password }, { withCredentials: true })
            .pipe(map(customer => {
                this.customerSubject.next(customer);
                this.router.navigate(['/customers']);
                return customer;

            }));
    }

    logout() {
        this.http.post<any>(`${environment.apiUrl}/customers/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.customerSubject.next(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn(){
        return localStorage.getItem('customer') !== null;
      }

    adminisLoggedIn(){
        return localStorage.getItem('admin') !== null;
        
      }  


    adminlogin(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/admin/authenticate`, { username, password }, { withCredentials: true })
            .pipe(map(admin => {
                this.adminSubject.next(admin);
                this.router.navigate(['/admin']);
                return admin;
            }));
    }

    adminlogout() {
        this.http.post<any>(`${environment.apiUrl}/admin/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.adminSubject.next(null);
        this.router.navigate(['/adminlogin']);
    }

    getadmin() {
        
        return localStorage.getItem('admin') !== null;
    }

    refreshToken() {
        return this.http.post<any>(`${environment.apiUrl}/customers/refresh-token`, {}, { withCredentials: true })
            .pipe(map((customer) => {
                this.customerSubject.next(customer);
                return customer;
            }));
    }
    

    // helper methods

    private refreshTokenTimeout;


    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
    
}
