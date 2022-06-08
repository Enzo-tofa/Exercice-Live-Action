import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exercice Enzo';
  chartOptions: any;
  sites = [
    { value: 'siteA', viewValue: 'Site A' },
    { value: 'siteB', viewValue: 'Site B' },
  ];
  buttonAppear = false;
  matSelected = 'siteA';
  siteChoosen = 'siteA';
  loading1 = false;
  average: number|string = 0;
  max: number|string = 0;

  public request: RequestHtml[] = [];
  public chartData: any;
  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.generate();
  }

  generate() {
    this.loading1 = true;
    setTimeout(() => {
      this.createChart('container', this.matSelected, 'Graphe bleu', 'blue');
      this.createChart('container2', this.matSelected, 'Graphe rouge', 'red');
      this.loading1 = false;
    }, 2000);
  }

  createChart(container, matSelected, title, color) {
    this.httpService.get<any[]>('./assets/' + matSelected + '.json', { responseType: 'json' }).subscribe(
      data => {
        this.request = data as RequestHtml[];
        let a: any = Object.values(this.request)[2];
        this.chartData = {
          title: {
            text: title
          },
          accessibility: {
            description: 'This is the most used desktop screen reader'
          },
          yAxis: {
            type: 'linear',
          },
          xAxis: {
            type: 'datetime',
          },
          series: [{
            name: 'TrafficOut',
            color: color,
            data: a
          },],
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }
        };
        Highcharts.setOptions({
          time: {
            timezone: 'Europe/London'
          }
        });
        this.showChart(container);
        this.max = this.getMax(a);
        this.average = this.getAverage(a);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  showChart(container) {
    Highcharts.chart(container, this.chartData);
  }

  select() {
    this.buttonAppear = true;
  }

  reset() {
    this.buttonAppear = false;
    if (this.matSelected === 'siteB' && this.siteChoosen === 'siteA') {
      this.matSelected = 'siteA'
    }
    if (this.matSelected === 'siteA' && this.siteChoosen === 'siteB') {
      this.matSelected = 'siteB'
    }
  }

  update() {
    if (this.matSelected === 'siteB' && this.siteChoosen === 'siteB' || this.matSelected === 'siteA' && this.siteChoosen === 'siteA') {
      this.buttonAppear = false;
      console.log('failure');
    }
    else {
      this.buttonAppear = false;
      this.siteChoosen = this.matSelected;
      this.generate();
      console.log('success');
      console.log(Highcharts.charts[0]);
    }
  }

  getAverage(data: any[]) {
    let sum: number = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i][1];
    }
    let average = sum / data.length;
    return (average / 1000000).toFixed(2);
  }

  getMax(data: any[]) {
    let max: number = 0;
    for (let i = 0; i < data.length; i++) {
      if (max < data[i][1]) {
        max = data[i][1]
      }
    }
    return (max / 1000000).toFixed(2);
  }
}

interface RequestHtml {
  id: string;
  name: string;
  trafficOut: number[];
  unit: string;
}

