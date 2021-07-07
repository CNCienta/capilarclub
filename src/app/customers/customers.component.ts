import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable } from 'rxjs';

import { Appointment } from '../models/appointment'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class CustomersComponent implements OnInit {

  
  customer: any = [];
  actions = null;
  orders = null;
  products = null;
  services = null;
  appointments = null;
  workers = null;

  appointmentForm: FormGroup;
  
  loading = false;
  submitted = false;
  url: string | ArrayBuffer;
  returnUrl: string;

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent<{ appointments: Appointment }>[]>;

  activeDayIsOpen: boolean = false;

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  constructor(

    private accountService: AccountService,
    private authenticationService: AuthenticationService, 
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    
    ) { 

      this.customer = JSON.parse(localStorage.getItem('customer'));

      
    }
  
    ngOnInit(): void {

      this.appointmentForm = this.formBuilder.group({

        date: [null, Validators.required],
        hour: [null, Validators.required],
        name: [null, Validators.required],
        customer: [null, Validators.required],
        payed: [null, Validators.required,],
        service: [null, Validators.required],
        worker: [null, Validators.required,],

    });

      this.fetchEvents();

      this.accountService.getAllworkers()
      .pipe(first())
      .subscribe(workers => this.workers = workers);
  
      this.accountService.getAllorders()
      .pipe(first())
      .subscribe(orders => this.orders = orders);
  
      this.accountService.getAllproducts()
      .pipe(first())
      .subscribe(products => this.products = products);
  
      this.accountService.getAllappointments()
      .pipe(first())
      .subscribe(appointments => this.appointments = appointments);
  
      this.accountService.getAllactions()
      .pipe(first())
      .subscribe(actions => this.actions = actions);

      this.accountService.getAllservices()
      .pipe(first())
      .subscribe(services => this.services = services);
      

    }
    

    logout(){
      this.authenticationService.logout();
      this.router.navigateByUrl('/login');
    }
  
    fetchEvents(): void {
      const getStart: any = {
        month: startOfMonth,
        week: startOfWeek,
        day: startOfDay,
      }[this.view];
  
      const getEnd: any = {
        month: endOfMonth,
        week: endOfWeek,
        day: endOfDay,
      }[this.view];
  
      const params = new HttpParams()
        .set(
          'primary_release_date.gte',
          format(getStart(this.viewDate), 'yyyy-MM-dd')
        )
        .set(
          'primary_release_date.lte',
          format(getEnd(this.viewDate), 'yyyy-MM-dd')
        )
        .set('api_key', '0ec33936a68018857d727958dca1424f');

        const colors: any = {
          red: {
            primary: '#ad2121',
            secondary: '#FAE3E3',
          },
          blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF',
          },
          yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA',
          },
        };
  
      this.events$ = this.http
        .get('https://api.themoviedb.org/3/discover/movie', { params })
        .pipe(
          map(({ results }: { results: Appointment[] }) => {
            return results.map((appointments: Appointment) => {
              return {
                title: this.appointments.name,
                start: new Date(
                  appointments.date + getTimezoneOffsetString(this.viewDate)
                ),
                color: colors.yellow,
                allDay: true,
                meta: {
                  appointments,
                },
              };
            });
          })
        );
    }
  
    dayClicked({
      date,
      events,
    }: {
      date: Date;
      events: CalendarEvent<{ appointment: Appointment }>[];
    }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
          this.viewDate = date;
        }
      }
    }
  
    eventClicked(event: CalendarEvent<{ appointment: Appointment }>): void {
      window.open(
        `https://www.themoviedb.org/movie/${event.meta.appointment.id}`,
        '_blank'
      );
    }

    get f() { return this.appointmentForm.controls; }

    onSubmit() {
      this.submitted = true;

      // reset alerts on submit

      // stop here if form is invalid
      if (this.appointmentForm.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.aDDappointment(this.appointmentForm.value)
          .pipe(first())
          .subscribe(
              data => {
                this.router.navigate(['/customers']);
              },
              error => {
                  this.loading = false;
              });
  }
  

  }
  


