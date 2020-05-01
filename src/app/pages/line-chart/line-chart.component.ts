import { Component, ViewChild } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';
import { DbProvider } from '../../providers/db.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {

  public chartData: ChartDataSets[];
  public lineChartData: ChartDataSets[];
  public lineChartData1: ChartDataSets[];
  public lineChartData2: ChartDataSets[];
  public lineChartData3: ChartDataSets[];
  public lineChartLabels: Label[];
  public chartLabels: Label[];
  public lineChartOptions: any;
  public chartOptions: any;
  public lineChartColors: Color[];
  public lineChartColors1: Color[];
  public lineChartColors2: Color[];
  public lineChartColors3: Color[];
  public lineChartLegend: boolean;
  public lineChartType: string;
  public lineChartPlugins;
  public data: any[] = [];

  bars: any;
  colorArray: any;
  segment: string;
  viewFlag: boolean;
  chartType: string;
  chartTitle: string;
  start: number;
  end: number;
  buttonText: string;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
    private dbProvider: DbProvider,
    private loadingController: LoadingController
  ) {
    this.start = 0;
    this.end = 10;
    this.segment = 'Combined';
    this.viewFlag = true;
    this.chartType = 'line';
    this.chartTitle = 'Line';
    this.buttonText = 'Without';
    this.lineChartData = [
      { data: [], label: 'Confirmed ' },
      { data: [], label: 'Deceased' },
      { data: [], label: 'Recovered' }
    ];
    this.lineChartLabels = [];
    this.checkColor();
  }

  ionViewDidEnter() {
    this.loadChartData(this.start, this.end);
  }

  async showLoader() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 500
    });
    await loading.present();
    await loading.onDidDismiss();
  }

  loadChartData(start: number, end: number) {
    let arr;
    const doc = [];
    const label = [];
    const con = [];
    const dec = [];
    const rec = [];
    // this.showLoader();
    this.dbProvider.getCovid(start, end).then((data) => {
      arr = data;
      for (const val of arr) {
        doc.push(val.doc);
      }
      doc.sort((a, b) => parseFloat(a._id) - parseFloat(b._id));
      for (const chart of doc) {
        label.push(chart.label);
        con.push(chart.confirmed);
        dec.push(chart.deceased);
        rec.push(chart.recovered);
      }
      this.lineChartData = [
        { data: con, label: 'Confirmed ' },
        { data: dec, label: 'Deceased' },
        { data: rec, label: 'Recovered' }
      ];
      this.lineChartLabels = label;
      this.checkColor();
    });
  }

  changeToPage() {
    this.start = 0;
    this.end = 10;
    if (this.buttonText === 'With') {
      this.buttonText = 'Without';
    } else {
      this.buttonText = 'With';
    }
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
    this.chartData = [
      { data: this.lineChartData[0].data, label: 'Confirmed ' },
      { data: this.lineChartData[1].data, label: 'Deceased' },
      { data: this.lineChartData[2].data, label: 'Recovered' }
    ];
    this.lineChartData1 = [
      { data: this.lineChartData[0].data, label: 'Confirmed ' }
    ];
    this.lineChartData2 = [
      { data: this.lineChartData[2].data, label: 'Recovered' }
    ];
    this.lineChartData3 = [
      { data: this.lineChartData[1].data, label: 'Deceased' },
    ];
    this.chartLabels = this.lineChartLabels;
    this.lineChartOptions = {
      responsive: true,
      pan: {
        enabled: true,
        mode: 'x',
        sensitivity: 5,
        speed: 10,
        threshold: 10,
        rangeMin: {
          x: null,
          y: 0,
        },
        rangeMax: {
          x: null,
          y: 100
        }
      },
      zoom: {
        enabled: true,
        mode: 'x',
        sensitivity: 7,
        speed: 10,
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
            min: this.start.toString(),
            max: this.end.toString()
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
    this.chartOptions = {
      responsive: true,
      elements:
      {
        point:
        {
          radius: 5,
          hitRadius: 6,
          hoverRadius: 6,
          hoverBorderWidth: 3
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
            min: this.start.toString(),
            max: this.end.toString()
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

  next() {
    if (this.end !== 1000) {
      this.start = this.start + 10;
      this.end = this.end + 10;
      this.loadChartData(this.start, this.end);
    }
  }

  previous() {
    if (this.start !== 0) {
      this.start = this.start - 10;
      this.end = this.end - 10;
      this.loadChartData(this.start, this.end);
    }
  }
}
