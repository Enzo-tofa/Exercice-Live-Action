import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exercice Enzo';
  chartOptions: any;

  constructor (private httpService: HttpClient) {   }

  public arrSales : any[] = [];
  public chartData: any = {
    chart: {
      type: 'line'
    },

    xAxis: {    // the 'x' axis or 'category' axis.
        categories: ['jan', 'feb', 'mar']
    },

    title: {
        text: 'Monthly Sales Chart'
    },

    series: [
      { 
        data: []
      }
    ],
    
    colors: ['#000', 'rgb(102,203,22)', 'red', '#9e77f3', '#034C65'],

    tooltip: {
        backgroundColor: '#FCFFC5'
    }
  }

ngOnInit () {

    this.httpService.get('./assets/SiteA.json', {responseType: 'json'}).subscribe(
      data => {
        this.arrSales = data as any[];    // populate array with json.
        this.showChart();         // show the chart.
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  showChart () {
    this.chartOptions.series = this.arrSales;       // assign data to the series.
    Highcharts.chart('div-container', this.chartOptions);    // Update the chart.
  }
}