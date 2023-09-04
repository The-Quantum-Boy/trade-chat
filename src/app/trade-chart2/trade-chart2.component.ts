import { Component } from '@angular/core';
import { dataSeries } from '../trade-chart/dataseries';
import * as ApexCharts from 'apexcharts'
@Component({
  selector: 'app-trade-chart2',
  templateUrl: './trade-chart2.component.html',
  styleUrls: ['./trade-chart2.component.scss']
})
export class TradeChart2Component {

  chart!: ApexCharts;
  data: any = [];
  activeButton: string = 'one_day';


  constructor() {
    // this.data = [];
  }


  ngOnInit(): void {
    this.initializeChart();
    this.activeButton = 'one_day'

    this.chart.zoomX(new Date('28 Jan 2023').getTime(), new Date('29 Jan 2023').getTime());

    // this.updateChartData();
    // var ts2 = 1484418600000;
    // var spikes = [5, -5, 3, -3, 8, -8]
    // for (var i = 0; i < 120; i++) {
    //   ts2 = ts2 + 86400000;
    //   var innerArr = [ts2, dataSeries[1][i].value];
    //   this.dates.push(innerArr)
    // }
  }

  options: ApexCharts.ApexOptions = {};
  initializeChart(): void {
    const TICKINTERVAL = 86400000;
    const XAXISRANGE = 777600000;

    const startDate = new Date('2023-01-01').getTime();
    const endDate = new Date('2024-12-31').getTime();

    for (let timestamp = startDate; timestamp <= endDate; timestamp += TICKINTERVAL) {
      const value = Math.random() * 100;
      this.data.push([timestamp, value]);
    }

    const dynamicWidth = this.data.length;
    const chartWidth = dynamicWidth < window.innerWidth ? '100%' : dynamicWidth

    this.options = {
      series: [{
        name: 'series 1',
        data: this.data
      }],
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        // width: chartWidth,
        zoom: {
          autoScaleYaxis: true
        }
      },
      annotations: {
        yaxis: [{
          // y: 30,
          // borderColor: '#999',
          // label: {
          //   // show: true,
          //   text: 'Support',
          //   style: {
          //     color: "#fff",
          //     background: '#00E396'
          //   }
          // }
        }],
        xaxis: [{
          // x: new Date('14 Nov 2012').getTime(),
          // borderColor: '#999',
          // yAxisIndex: 0,
          // label: {
          //   // show: true,
          //   text: 'Rally',
          //   style: {
          //     color: "#fff",
          //     background: '#775DD0'
          //   }
          // }
        }]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        // style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        min: new Date('01 Jan 2023').getTime(), // Set the start date
        max: new Date('31 Dec 2024').getTime(), // Set the end date
        // tickAmount: 6,
        labels: {
          datetimeUTC: false,
          formatter: (value: string, timestamp?: number, opts?: any) => {
            const date = new Date(timestamp || 0); // Use timestamp if available, otherwise use 0
            const day = date.getDate();
            const month = date.getMonth() + 1; // Months are zero-indexed
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const year = date.getFullYear();

            if (this.activeButton == 'one_day') {
              return `${day}/${month} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            }
            return `${day}/${month}/${year}`;
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100]
        },
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'round',
        width: 1.5
      },
    };

    this.chart = new ApexCharts(document.querySelector('#chart'), this.options);
    this.chart.render();

  }



  // private resetCssClasses() {
  //   const buttons = document.querySelectorAll('button');
  //   buttons.forEach(button => button.classList.remove('active'));
  // }
  onButtonClick(buttonId: string): void {
    const buttonElement = document.getElementById(buttonId);

    if (buttonElement) {
      this.resetCssClasses(buttonElement);
      this.activeButton = buttonId;

      switch (buttonId) {
        case 'one_day':
          this.chart.zoomX(new Date('28 Jan 2023').getTime(), new Date('29 Jan 2023').getTime());
          break;
        case 'one_month':
          this.chart.zoomX(new Date('01 Jan 2023').getTime(), new Date('31 Jan 2023').getTime());
          break;
        case 'six_months':
          this.chart.zoomX(new Date('01 Jan 2023').getTime(), new Date('01 Jul 2023').getTime());
          break;
        case 'one_year':
          this.chart.zoomX(new Date('01 Jan 2023').getTime(), new Date('31 Dec 2023').getTime());
          break;
        case 'all':
          this.chart.zoomX(new Date('01 Jan 2023').getTime(), new Date('31 Dec 2024').getTime());
          break;
        default:
          break;
      }
    } else {
      console.error(`Element with ID '${buttonId}' not found.`);
    }
  }


  resetCssClasses(activeEl: HTMLElement): void {
    const els = document.querySelectorAll('button');
    els.forEach(el => el.classList.remove('active'));

    activeEl.classList.add('active');
  }


}
