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

  // PIE CHART
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `${context.label}: ${value.toFixed(0)}%`;
          }
        }
      }
    }
  };

  public pieChartLabels: string[] = ['Individuals', 'Corporations', 'Foundations', 'Government Agencies'];
  public pieChartDatasets: any = [{
    data: [],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
  }];
  public pieChartLegend = false;
  public pieChartPlugins = [
  ];


  // LINE CHART
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  public lineChartLabels: string[] = [];
  public lineChartDatasets: any = [{
    data: [],
    label: 'Total Donations in EUR',
    borderColor: '#4BC0C0',
    fill: false,
  }];
  public lineChartLegend = true;
  public lineChartPlugins = [];

  public totalDonations: number = 0; // current month
  public totalDonationsForLineChart: number = 0; // total until current month


  constructor() {
  }


  ngOnInit() {
    this.updateCharts();
  }


  updateCharts() {
    const currentMonth = new Date().getMonth();
    const monthlyData = this.generateRandomDataForYear();

    // Generate a random total amount for the current month
    const currentMonthData = monthlyData[currentMonth];
    const totalForMonth = currentMonthData.reduce((acc, val) => acc + val, 0);
    this.totalDonations = totalForMonth;

    // Calculate the percentages for the pie chart
    const percentages = this.calculatePercentages(totalForMonth, currentMonthData);

    // Update Pie Chart with percentage data for the current month
    this.pieChartDatasets[0].data = percentages;

    // Update Line Chart with monthly data, setting future months to null
    this.lineChartLabels = this.getMonthLabels();
    this.lineChartDatasets[0].data = this.getMonthlyTotals(monthlyData, currentMonth);

    // Calculate total donations up to the current month for the Line Chart
    this.totalDonationsForLineChart = this.getTotalDonationsUpToCurrentMonth(monthlyData, currentMonth);
  }


  generateRandomDataForYear() {
    const monthlyData = [];
    for (let i = 0; i < 12; i++) {
      monthlyData.push(this.generateRandomDonations(4));
    }
    return monthlyData;
  }


  generateRandomDonations(numCategories: number) {
    const donations = [];
    for (let i = 0; i < numCategories; i++) {
      donations.push(Math.floor(Math.random() * 2000) + 1000); // Generate random donations between 1000 and 6000 euros
    }
    return donations;
  }


  calculatePercentages(total: number, values: number[]) {
    const sum = values.reduce((a, b) => a + b, 0);
    if (sum === 0) return values.map(() => 0); // Avoid division by zero
    return values.map(value => (value / sum) * 100);
  }


  getMonthLabels() {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }


  getMonthlyTotals(monthlyData: number[][], currentMonth: number) {
    // Accumulate monthly totals up to and including the current month, set future months to null
    const totals = new Array(12).fill(null);
    for (let i = 0; i <= currentMonth; i++) {
      totals[i] = monthlyData[i].reduce((acc, val) => acc + val, 0);
    }
    return totals;
  }


  getTotalDonationsUpToCurrentMonth(monthlyData: number[][], currentMonth: number) {
    // Summe der gesamten Spenden bis zum aktuellen Monat
    return monthlyData.slice(0, currentMonth + 1).flat().reduce((acc, val) => acc + val, 0);
  }

}
