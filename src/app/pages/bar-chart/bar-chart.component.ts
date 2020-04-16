import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {

  public barChartData: ChartDataSets[];
  public barChartData1: ChartDataSets[];
  public barChartData2: ChartDataSets[];
  public barChartData3: ChartDataSets[];
  public barChartLabels: Label[];
  public barChartOptions: any;
  public barChartColors: Color[];
  public barChartColors1: Color[];
  public barChartColors2: Color[];
  public barChartColors3: Color[];
  public barChartLegend: boolean;
  public barChartType: string;
  public barChartPlugins;

  bars: any;
  colorArray: any;
  segment: string;
  viewFlag: boolean;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {
    this.segment = 'Combined';
    this.viewFlag = true;
    this.createBarChart();
  }

  ionViewDidEnter() {
  }

  changeView() {
    this.viewFlag = !this.viewFlag;
  }

  createBarChart() {
    this.barChartData = [
      { data: [10, 22, 25, 32, 42, 50, 60, 67, 69, 72, 75, 77, 82, 88, 93, 98], label: 'Confirmed ' },
      { data: [3, 5, 6, 8, 10, 15, 20, 22, 25, 29, 30, 31, 35, 36, 38, 40], label: 'Deceased' },
      { data: [7, 17, 19, 24, 32, 35, 40, 45, 44, 43, 45, 46, 47, 52, 55, 58], label: 'Recovered' }
    ];
    this.barChartData1 = [
      { data: [10, 22, 25, 32, 42, 50, 60, 67, 69, 72, 75, 77, 82, 88, 93, 98], label: 'Confirmed ' }
    ];
    this.barChartData2 = [
      { data: [7, 17, 19, 24, 32, 35, 40, 45, 44, 43, 45, 46, 47, 52, 55, 58], label: 'Recovered' }
    ];
    this.barChartData3 = [
      { data: [3, 5, 6, 8, 10, 15, 20, 22, 25, 29, 30, 31, 35, 36, 38, 40], label: 'Deceased' },
    ];
    this.barChartLabels = ['1-apr', '2-apr', '3-apr', '4-apr', '5-apr', '6-apr', '7-apr', '8-apr',
      '9-apr', '10-apr', '11-apr', '12-apr', '13-apr', '14-apr', '15-apr', '16-apr'
    ];
    this.barChartOptions = {
      responsive: true,
      pan: {
        enabled: true,
        mode: 'xy',
      },
      zoom: {
        enabled: true,
        mode: 'xy',
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
    this.barChartColors = [
      { // blue
        backgroundColor: 'rgba(0,0,255,0.8)',
        borderColor: 'rgba(0,0,255,1)',
      },
      { // green
        backgroundColor: 'rgba(0,100,0,0.8)',
        borderColor: 'rgba(0,100,0,1)',
      },
      { // red
        backgroundColor: 'rgba(255,0,0,0.8)',
        borderColor: 'rgba(255,0,0,1)',
      }
    ];
    this.barChartColors1 = [
      { // blue
        backgroundColor: 'rgba(0,0,255,0.8)',
        borderColor: 'rgba(0,0,255,1)',
      }
    ];
    this.barChartColors2 = [
      { // green
        backgroundColor: 'rgba(0,100,0,0.8)',
        borderColor: 'rgba(0,100,0,1)',
      }
    ];
    this.barChartColors3 = [
      { // red
        backgroundColor: 'rgba(255,0,0,0.8)',
        borderColor: 'rgba(255,0,0,1)',
      }
    ];
    this.barChartLegend = true;
    this.barChartType = 'bar';
    this.barChartPlugins = [zoomPlugin];
  }
}
