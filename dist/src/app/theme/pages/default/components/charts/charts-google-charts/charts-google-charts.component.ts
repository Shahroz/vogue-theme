import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare let google: any;
@Component({
  selector: "app-charts-google-charts",
  templateUrl: "./charts-google-charts.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class ChartsGoogleChartsComponent implements OnInit, AfterViewInit {
  @ViewChild('chart1')
  private chart1: ElementRef;
  @ViewChild('chart2')
  private chart2: ElementRef;
  @ViewChild('chart3')
  private chart3: ElementRef;
  @ViewChild('chart4')
  private chart4: ElementRef;
  @ViewChild('chart5')
  private chart5: ElementRef;

  ngOnInit() {

  }

  ngAfterViewInit() {
    /*this._script.loadScripts('app-charts-google-charts',
      ['assets/demo/default/custom/components/charts/google-charts.js']);
      google.load('visualization', '1', { packages: ['corechart', 'bar', 'line'], callback: GoogleChartsDemo.runDemos() });*/
    // GOOGLE CHARTS INIT
    google.charts.load('current', {
      packages: ['corechart', 'bar', 'line']
    });

    google.charts.setOnLoadCallback(() => {
      this.initCharts();
    });
  }

  initCharts() {
    this.PieCharts();
    this.ColumnCharts();
    this.LineCharts();
  }

  ColumnCharts() {
    // COLUMN CHART
    let data = new google.visualization.DataTable({
      cols: [
        {
          label: 'Time of Day', id: 'Time of Day', type: 'timeofday'
        },
        {
          label: 'Motivation Level', id: 'Motivation Level', type: 'number'
        },
        {
          label: 'Sales', id: 'Energy Level', type: 'number'
        }
      ],
      rows: [
        [{
          c: [{
            v: [8, 0, 0],
            f: '8 am'
          }, 1, .25]
        },
        {
          c: [{
            v: [9, 0, 0],
            f: '9 am'
          }, 2, .5]
        },
        {
          c: [{
            v: [10, 0, 0],
            f: '10 am'
          }, 3, 1]
        },
        {
          c: [{
            v: [11, 0, 0],
            f: '11 am'
          }, 4, 2.25]
        }],
        [{
          c: [{
            v: [12, 0, 0],
            f: '12 pm'
          }, 5, 2.25]
        },
        {
          c: [{
            v: [13, 0, 0],
            f: '1 pm'
          }, 6, 3]
        },
        {
          c: [{
            v: [14, 0, 0],
            f: '2 pm'
          }, 7, 4]
        },
        {
          c: [{
            v: [15, 0, 0],
            f: '3 pm'
          }, 8, 5.25]
        }]
      ]
    });

    let options = {
      title: 'Motivation and Energy Level Throughout the Day',
      focusTarget: 'category',
      hAxis: {
        title: 'Time of Day',
        format: 'h:mm a',
        viewWindow: {
          min: [7, 30, 0],
          max: [17, 30, 0]
        },
      },
      vAxis: {
        title: 'Rating (scale of 1-10)'
      }
    };

    let chart1 = new google.visualization.ColumnChart(this.chart1.nativeElement);
    chart1.draw(data, options);

    let chart2 = new google.visualization.ColumnChart(this.chart2.nativeElement);
    chart2.draw(data, options);
  }

  PieCharts() {
    let data = google.visualization.arrayToDataTable(
      [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
      ]);

    let options1 = {
      title: 'My Daily Activities'
    };

    let chart1 = new google.visualization.PieChart(this.chart3.nativeElement);
    chart1.draw(data, options1);

    let options2 = {
      pieHole: 0.4
    };

    let chart2 = new google.visualization.PieChart(this.chart4.nativeElement);
    chart2.draw(data, options2);
  }

  LineCharts() {
    // LINE CHART
    let data = google.visualization.arrayToDataTable(
      [
        [
          { label: 'Day', id: 'Day', type: 'number' },
          { label: 'Guardians of the Galaxy', id: 'Guardians of the Galaxy', type: 'number' },
          { label: 'The Avengers', id: 'The Avengers', type: 'number' },
          { label: 'Transformers: Age of Extinction', id: 'Transformers: Age of Extinction', type: 'number' },
        ],
        [
          [1, 37.8, 80.8, 41.8],
          [2, 30.9, 69.5, 32.4],
          [3, 25.4, 57, 25.7],
          [4, 11.7, 18.8, 10.5],
          [5, 11.9, 17.6, 10.4],
          [6, 8.8, 13.6, 7.7],
          [7, 7.6, 12.3, 9.6],
          [8, 12.3, 29.2, 10.6],
          [9, 16.9, 42.9, 14.8],
          [10, 12.8, 30.9, 11.6],
          [11, 5.3, 7.9, 4.7],
          [12, 6.6, 8.4, 5.2],
          [13, 4.8, 6.3, 3.6],
          [14, 4.2, 6.2, 3.4]
        ]
      ]);

    let options = {
      chart: {
        title: 'Box Office Earnings in First Two Weeks of Opening',
        subtitle: 'in millions of dollars (USD)'
      }
    };

    let chart = new google.visualization.LineChart(this.chart5.nativeElement);
    chart.draw(data, options);
  }
}
