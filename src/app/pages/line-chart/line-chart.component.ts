import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {

  public lineChartData: ChartDataSets[];
  public lineChartData1: ChartDataSets[];
  public lineChartData2: ChartDataSets[];
  public lineChartData3: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: any;
  public lineChartColors: Color[];
  public lineChartColors1: Color[];
  public lineChartColors2: Color[];
  public lineChartColors3: Color[];
  public lineChartLegend: boolean;
  public lineChartType: string;
  public lineChartPlugins;

  bars: any;
  colorArray: any;
  segment: string;
  viewFlag: boolean;
  chartType: string;
  chartTitle: string;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  constructor() {
    this.segment = 'Combined';
    this.viewFlag = true;
    this.chartType = 'line';
    this.chartTitle = 'Line';
    this.checkColor();
  }

  ionViewDidEnter() {
  }

  changeView() {
    this.viewFlag = !this.viewFlag;
  }

  changeChart(type) {
    this.chartType = type;
    this.checkColor();
  }

  checkColor() {
    if (this.chartType === 'line') {
      this.chartTitle = 'Line';
      this.lineChartColors = [
        { // blue
          backgroundColor: 'rgba(0,0,255,0.2)',
          borderColor: 'rgba(0,0,255,1)',
          pointBackgroundColor: 'rgba(0,0,255,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0,0,255,0.8)'
        },
        { // red
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'rgba(255,0,0,1)',
          pointBackgroundColor: 'rgba(255,0,0,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,0,0,0.8)'
        },
        { // green
          backgroundColor: 'rgba(0,100,0,0.3)',
          borderColor: 'rgba(0,100,0,1)',
          pointBackgroundColor: 'rgba(0,100,0,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0,100,0,0.8)'
        }
      ];
      this.lineChartColors1 = [
        { // blue
          backgroundColor: 'rgba(0,0,255,0.2)',
          borderColor: 'rgba(0,0,255,1)',
          pointBackgroundColor: 'rgba(0,0,255,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0,0,255,0.8)'
        }
      ];
      this.lineChartColors2 = [
        { // green
          backgroundColor: 'rgba(0,100,0,0.3)',
          borderColor: 'rgba(0,100,0,1)',
          pointBackgroundColor: 'rgba(0,100,0,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0,100,0,0.8)'
        }
      ];
      this.lineChartColors3 = [
        { // red
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'rgba(255,0,0,1)',
          pointBackgroundColor: 'rgba(255,0,0,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,0,0,0.8)'
        }
      ];
    } else {
      this.chartTitle = 'Bar';
      this.lineChartColors = [
        { // blue
          backgroundColor: 'rgba(0,0,255,0.8)',
          borderColor: 'rgba(0,0,255,1)',
        },
        { // red
          backgroundColor: 'rgba(255,0,0,0.8)',
          borderColor: 'rgba(255,0,0,1)',
        },
        { // green
          backgroundColor: 'rgba(0,100,0,0.8)',
          borderColor: 'rgba(0,100,0,1)',
        }
      ];
      this.lineChartColors1 = [
        { // blue
          backgroundColor: 'rgba(0,0,255,0.8)',
          borderColor: 'rgba(0,0,255,1)',
        }
      ];
      this.lineChartColors2 = [
        { // green
          backgroundColor: 'rgba(0,100,0,0.8)',
          borderColor: 'rgba(0,100,0,1)',
        }
      ];
      this.lineChartColors3 = [
        { // red
          backgroundColor: 'rgba(255,0,0,0.8)',
          borderColor: 'rgba(255,0,0,1)',
        }
      ];
    }
    this.createLineChart();
  }

  createLineChart() {
    this.lineChartData = [
      { data: [10, 22, 25, 32, 42, 50, 60, 67, 69, 72, 75, 77, 82, 88, 93, 98], label: 'Confirmed ' },
      { data: [3, 5, 6, 8, 10, 15, 20, 22, 25, 29, 30, 31, 35, 36, 38, 40], label: 'Deceased' },
      { data: [7, 17, 19, 24, 32, 35, 40, 45, 44, 43, 45, 46, 47, 52, 55, 58], label: 'Recovered' }
    ];
    this.lineChartData1 = [
      { data: [10, 22, 25, 32, 42, 50, 60, 67, 69, 72, 75, 77, 82, 88, 93, 98], label: 'Confirmed ' }
    ];
    this.lineChartData2 = [
      { data: [7, 17, 19, 24, 32, 35, 40, 45, 44, 43, 45, 46, 47, 52, 55, 58], label: 'Recovered' }
    ];
    this.lineChartData3 = [
      { data: [3, 5, 6, 8, 10, 15, 20, 22, 25, 29, 30, 31, 35, 36, 38, 40], label: 'Deceased' },
    ];
    this.lineChartLabels = ['1-apr', '2-apr', '3-apr', '4-apr', '5-apr', '6-apr', '7-apr', '8-apr',
      '9-apr', '10-apr', '11-apr', '12-apr', '13-apr', '14-apr', '15-apr', '16-apr'
    ];
    this.lineChartOptions = {
      responsive: true,
      pan: {
        enabled: true,
        mode: 'x',
        rangeMin: {
          x: null,
          y: 0
        },
        rangeMax: {
          x: null,
          y: 100
        }
      },
      zoom: {
        enabled: true,
        mode: 'x',
        sensitivity: 0.3,
        rangeMin: {
          x: null,
          y: 0
        },
        rangeMax: {
          x: null,
          y: 100
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 12
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            beginAtZero: true,
          }
        }]
      },
      annotation: {
        annotations: [{}],
      },
    };
    this.lineChartLegend = true;
    this.lineChartType = this.chartType;
    this.lineChartPlugins = [zoomPlugin];
  }
}
