import { Component } from '@angular/core';
import { dataSeries } from '../trade-chart/dataseries';
import * as ApexCharts from 'apexcharts'

@Component({
  selector: 'app-realtime-trade-chart',
  templateUrl: './realtime-trade-chart.component.html',
  styleUrls: ['./realtime-trade-chart.component.scss']
})
export class RealtimeTradeChartComponent {
  constructor() { }
  TICKINTERVAL: any = 86400000;
  XAXISRANGE: any = 777600000;
  lastDate: any = 0;
  data: any = [];
  chart: any;
  ngOnInit(): void {
    // const TICKINTERVAL = 86400000;
    // let XAXISRANGE = 777600000;
    // let lastDate = 0;
    // let data: any = [];


    // this.getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
    //   min: 10,
    //   max: 90
    // });



    const options = {
      series: [{
        data: this.data.slice()
      }],
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Dynamic Updating Chart',
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range: this.XAXISRANGE,
      },
      yaxis: {
        max: 100
      },
      legend: {
        show: false
      },
    };

    this.chart = new ApexCharts(document.querySelector("#chart"), options);
    this.chart.render();


    this.realtime();
  }


  realtime() {
    setInterval(() => {
      this.getNewSeries(this.lastDate
        , {
          min: 10,
          max: 90
        });

      this.chart.updateSeries([{
        data: this.data
      }]);
    }, 1000);
  }

  getNewSeries(baseval: any, yrange: any) {
    const newDate = baseval + this.TICKINTERVAL;
    this.lastDate = newDate;

    for (let i = 0; i < this.data.length - 10; i++) {
      // IMPORTANT
      // we reset the x and y of the data which is out of the drawing area
      // to prevent memory leaks
      this.data[i].x = newDate - this.XAXISRANGE - this.TICKINTERVAL;
      this.data[i].y = 0;
    }

    this.data.push({
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    });
  }

  resetData() {
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
    this.data = this.data.slice(this.data.length - 10, this.data.length);
  }

  getDayWiseTimeSeries = (baseval: any, count: any, yrange: any) => {
    let i = 0;
    while (i < count) {
      const x = baseval;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      this.data.push({
        x,
        y
      });
      this.lastDate = baseval;
      baseval += this.TICKINTERVAL;
      i++;
    }
  }

  submit() {

    const baseval = new Date('11 Feb 2017 GMT').getTime();
    const count = 10;
    const yrange = {
      min: 10,
      max: 90
    }


    const x = baseval;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;



    this.data.push({
      x,
      y
    });

  }

}
