import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  title = 'donations';

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartLabels: string[] = ['Individuals', 'Corporations', 'Foundations', 'Government Agencies'];
  public pieChartDatasets = [{
    data: [72, 8, 15, 5],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [

  ];


  constructor() {
  }

}
