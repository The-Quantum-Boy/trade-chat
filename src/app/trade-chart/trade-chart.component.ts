import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { dataSeries } from './dataseries';

@Component({
  selector: 'app-trade-chart',
  templateUrl: './trade-chart.component.html',
  styleUrls: ['./trade-chart.component.scss']
})
export class TradeChartComponent {
  chart!: ApexCharts;
  data: any;

  constructor() {
    this.data = [];
  }

  dates: any = [];
  ngOnInit(): void {
    this.initializeChart();
    // this.updateChartData();
    var ts2 = 1484418600000;
    var spikes = [5, -5, 3, -3, 8, -8]
    for (var i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      var innerArr = [ts2, dataSeries[1][i].value];
      this.dates.push(innerArr)
    }
  }

  initializeChart(): void {
    const TICKINTERVAL = 86400000;
    const XAXISRANGE = 777600000;

    const options: ApexCharts.ApexOptions = {
      series: [{
        name: 'XYZ MOTORS',
        data: this.dates
      }],
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Stock Price Movement',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: 'Price'
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0)
          }
        }
      }
    };

    this.chart = new ApexCharts(document.querySelector('#chart'), options);
    this.chart.render();
  }

  // updateChartData(): void {
  //   const TICKINTERVAL = 86400000;
  //   const XAXISRANGE = 777600000;

  //   const getNewSeries = (baseval:any, yrange:any) => {
  //     const newDate = baseval + TICKINTERVAL;

  //     for (let i = 0; i < this.data.length - 10; i++) {
  //       this.data[i].x = newDate - XAXISRANGE - TICKINTERVAL;
  //       this.data[i].y = 0;
  //     }

  //     this.data.push({
  //       x: newDate,
  //       y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  //     });
  //   }

  //   setInterval(() => {
  //     const lastDate = this.data[this.data.length - 1].x;
  //     getNewSeries.call(this, lastDate, {
  //       min: 10,
  //       max: 90
  //     });

  //     this.chart.updateSeries([
  //       {
  //         data: this.data
  //       }
  //     ]);
  //   }, 1000);
  // }
}
