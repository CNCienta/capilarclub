import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Admin } from '../models/admin';
import { Customer } from '../models/customer';
import { Worker } from '../models/worker';
import { Product } from '../models/product';
import { Appointment } from '../models/appointment';
import { Order } from '../models/order';
import { Service } from '../models/service';
import { Action } from '../models/action';
import { Institute } from '../models/institute';
import { Lab } from '../models/lab';
import { Program } from '../models/program';
import { Partner } from '../models/partner';

@Injectable({ providedIn: 'root' })
export class AccountService {


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

    private serviceSubject: BehaviorSubject<Service>;
    public service: Observable<Service>;

    private actionSubject: BehaviorSubject<Action>;
    public action: Observable<Action>;

    private instituteSubject: BehaviorSubject<Institute>;
    public institute: Observable<Institute>;

    private labSubject: BehaviorSubject<Lab>;
    public lab: Observable<Lab>;

    private programSubject: BehaviorSubject<Program>;
    public program: Observable<Program>;

    private partnerSubject: BehaviorSubject<Partner>;
    public partner: Observable<Partner>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {


        this.adminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('admin')));
        this.admin = this.adminSubject.asObservable();

        this.customerSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('customer')));
        this.customer = this.customerSubject.asObservable();

        this.workerSubject = new BehaviorSubject<Worker>(JSON.parse(localStorage.getItem('worker')));
        this.worker = this.workerSubject.asObservable();

        this.productSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('product')));
        this.product = this.productSubject.asObservable();

        this.appointmentSubject = new BehaviorSubject<Appointment>(JSON.parse(localStorage.getItem('appointment')));
        this.appointment = this.appointmentSubject.asObservable();

        this.orderSubject = new BehaviorSubject<Order>(JSON.parse(localStorage.getItem('order')));
        this.order = this.orderSubject.asObservable();

        this.serviceSubject = new BehaviorSubject<Service>(JSON.parse(localStorage.getItem('service')));
        this.service = this.serviceSubject.asObservable();

        this.actionSubject = new BehaviorSubject<Action>(JSON.parse(localStorage.getItem('action')));
        this.action = this.actionSubject.asObservable();

        this.instituteSubject = new BehaviorSubject<Institute>(JSON.parse(localStorage.getItem('intitute')));
        this.institute = this.instituteSubject.asObservable();

        this.labSubject = new BehaviorSubject<Lab>(JSON.parse(localStorage.getItem('lab')));
        this.lab = this.labSubject.asObservable();

        this.programSubject = new BehaviorSubject<Program>(JSON.parse(localStorage.getItem('program')));
        this.program = this.programSubject.asObservable();

        this.partnerSubject = new BehaviorSubject<Program>(JSON.parse(localStorage.getItem('partner')));
        this.partner = this.partnerSubject.asObservable();
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

    public get productsValue(): Product {
        return this.productSubject.value;
    }

    public get appointmentValue(): Appointment {
        return this.appointmentSubject.value;
    } 

    public get orderValue(): Order {
        return this.orderSubject.value;
    }

    public get serviceValue(): Service {
        return this.serviceSubject.value;
    }

    public get actionValue(): Action {
        return this.actionSubject.value;
    }

    public get intituteValue(): Institute {
        return this.instituteSubject.value;
    }

    public get labValue(): Lab {
        return this.labSubject.value;
    }

    public get programValue(): Program {
        return this.programSubject.value;
    }

    public get partnerValue(): Partner {
        return this.partnerSubject.value;
    }

    login(customername: string, password: string,) {
        return this.http.post<Customer>(`${environment.apiUrl}/customers/authenticate`, { customername, password, })
            .pipe(tap(ref => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('customer', JSON.stringify(ref));
                this.customerSubject.next(ref);
                return ref;
            }))
            
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('customer',);
        this.customerSubject.next(null);
        this.router.navigate(['/login']);
    }


    adminlogin(username: string, password: string,) {
        return this.http.post<Admin>(`${environment.apiUrl}/admin/authenticate`, { username, password, })
            .pipe(tap(ref => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('admin', JSON.stringify(ref));
                this.adminSubject.next(ref);
                return ref;
            }))
            
    }

    adminlogout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('admin',);
        this.adminSubject.next(null);
        this.router.navigate(['/adminlogin']);
    }

    getAllactions() {
        return this.http.get<Action>(`${environment.apiUrl}/actions`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.actionSubject.next(ref);
            return ref;
        }))
    }

    getAllcustomers() {
        return this.http.get<Customer>(`${environment.apiUrl}/customers`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.customerSubject.next(ref);
            return ref;
        }))
    }

    getAllworkers() {
        return this.http.get<Worker>(`${environment.apiUrl}/workers`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.workerSubject.next(ref);
            return ref;
        }))
    }

    getAllappointments() {
        return this.http.get<Appointment>(`${environment.apiUrl}/appointments`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.appointmentSubject.next(ref);
            return ref;
        }))
    }

    getAllorders() {
        return this.http.get<Order>(`${environment.apiUrl}/orders`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.orderSubject.next(ref);
            return ref;
        }))
    }

    getAllproducts() {
        return this.http.get<Product>(`${environment.apiUrl}/products`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.orderSubject.next(ref);
            return ref;
        }))
    }

    getAllservices() {
        return this.http.get<Service>(`${environment.apiUrl}/services`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.serviceSubject.next(ref);
            return ref;
        }))
    }

    getAllinstitutes() {
        return this.http.get<Institute>(`${environment.apiUrl}/institutes`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.instituteSubject.next(ref);
            return ref;
        }))
    }

    getAlllabs() {
        return this.http.get<Lab>(`${environment.apiUrl}/labs`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.labSubject.next(ref);
            return ref;
        }))
    }

    getAllprograms() {
        return this.http.get<Program>(`${environment.apiUrl}/programs`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.programSubject.next(ref);
            return ref;
        }))
    }

    getAllpartners() {
        return this.http.get<Partner>(`${environment.apiUrl}/partners`, {})
        .pipe(tap(ref => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.partnerSubject.next(ref);
            return ref;
        }))
    }

    register(customer: Customer) {
        
        return this.http.post(`${environment.apiUrl}/customers/register`, customer);
    }

    getadmin() {
        localStorage.getItem('admin');
        return ('admin');
    }

    getcustomer() {
        localStorage.getItem('customer');
        return ('customer');
    }

    getById(id: string) {
        return this.http.get<Customer>(`${environment.apiUrl}/customers/${id}`);
    }


    update(id, params) {
        return this.http.put(`${environment.apiUrl}/customers/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.customerValue.id) {
                    // update local storage
                    const customer = { ...this.customerValue, ...params };
                    localStorage.setItem('customer', JSON.stringify(customer));

                    // publish updated user to subscribers
                    this.customerSubject.next(customer);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/customers/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.customerValue.id) {
                    this.logout();
                }
                return x;
            }));
    }

    aDDappointment(appointment: Appointment) {
        return this.http.post<Appointment>(`${environment.apiUrl}/appointments`, appointment)
            .pipe(tap(ref => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('appointment', JSON.stringify(ref));
                this.appointmentSubject.next(ref);
                return ref;
            }))
            
    }


}