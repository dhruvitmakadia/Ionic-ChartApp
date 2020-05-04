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

  public lineChartData: ChartDataSets[];
  public lineChartData1: ChartDataSets[];
  public lineChartData2: ChartDataSets[];
  public lineChartData3: ChartDataSets[];
  public lineChartLabels: Label[];
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

  public bars: any;
  public colorArray: any;
  public segment: string;
  public viewFlag: boolean;
  public chartType: string;
  public chartTitle: string;
  public start: number;
  public end: number;
  public buttonText: string;

  public conFlag: boolean;
  public decFlag: boolean;
  public recFlag: boolean;

  private label: string[];
  private con: number[];
  private dec: number[];
  private rec: number[];

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
    this.conFlag = false;
    this.decFlag = false;
    this.recFlag = false;
    this.lineChartData = [
      { data: [], hidden: this.conFlag, label: 'Confirmed ' },
      { data: [], hidden: this.decFlag, label: 'Deceased' },
      { data: [], hidden: this.recFlag, label: 'Recovered' }
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
    this.label = [];
    this.con = [];
    this.dec = [];
    this.rec = [];
    // this.showLoader();
    this.dbProvider.getCovid(start, end).then((data) => {
      arr = data;
      for (const val of arr) {
        doc.push(val.doc);
      }
      doc.sort((a, b) => parseFloat(a._id) - parseFloat(b._id));
      for (const chart of doc) {
        this.label.push(chart.label);
        this.con.push(chart.confirmed);
        this.dec.push(chart.deceased);
        this.rec.push(chart.recovered);
      }
      this.changeLegend();
    });
  }

  changeLegend() {
    this.lineChartData = [
      { data: this.con, hidden: this.conFlag, label: 'Confirmed ' },
      { data: this.dec, hidden: this.decFlag, label: 'Deceased' },
      { data: this.rec, hidden: this.recFlag, label: 'Recovered' }
    ];
    this.lineChartLabels = this.label;
    this.checkColor();
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
    this.lineChartData1 = [
      { data: this.lineChartData[0].data, label: 'Confirmed ' }
    ];
    this.lineChartData2 = [
      { data: this.lineChartData[2].data, label: 'Recovered' }
    ];
    this.lineChartData3 = [
      { data: this.lineChartData[1].data, label: 'Deceased' },
    ];
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
        onClick: (e, legendItem) => {
          if (legendItem.datasetIndex === 0) {
            this.conFlag = !this.conFlag;
            this.changeLegend();
          }
          if (legendItem.datasetIndex === 1) {
            this.decFlag = !this.decFlag;
            this.changeLegend();
          }
          if (legendItem.datasetIndex === 2) {
            this.recFlag = !this.recFlag;
            this.changeLegend();
          }
        },
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
    this.lineChartOptions = {
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
        onClick: () => {},
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
