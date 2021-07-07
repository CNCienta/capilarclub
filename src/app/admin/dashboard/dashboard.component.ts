import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  customers = null;
  actions = null;
  orders = null;
  products = null;
  services = null;
  appointments = null;
  workers = null;
  

  lineChartData: ChartDataSets[] = [
    { data: [75, 72, 78, 75, 77, 75], label: 'Online Shop' },
    { data: [72, 76, 71, 73, 74, 78], label: 'Appointments' },
    { data: [77, 76, 75, 76, 73, 75], label: 'Shop' },
    { data: [74, 75, 77, 75, 78, 73], label: 'Barbery' },
    { data: [72, 73, 72, 76, 78, 77], label: 'Beauty Center' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(167, 255, 248, 0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.accountService.getAllcustomers()
    .pipe(first())
    .subscribe(customers => this.customers = customers);

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

    this.accountService.getAllappointments()
    .pipe(first())
    .subscribe(services => this.services = services);

    this.accountService.getAllactions()
    .pipe(first())
    .subscribe(actions => this.actions = actions);

  }

}