import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

require('jquery');
require('flot/jquery.flot');
require('flot/jquery.flot.pie');
require('flot/jquery.flot.time');
require('flot/jquery.flot.resize');
require('flot/jquery.flot.selection');

declare let $: any;

@Component({
  selector: "app-charts-flotcharts",
  templateUrl: "./charts-flotcharts.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class ChartsFlotchartsComponent implements OnInit, AfterViewInit {
  @ViewChild('chart1')
  private chart1: ElementRef;

  @ViewChild('chart2')
  private chart2: ElementRef;

  @ViewChild('chart3')
  private chart3: ElementRef;

  @ViewChild('chart4')
  private chart4: ElementRef;

  public dataset1: any;
  public options1: any;

  public dataset2: any;
  public options2: any;


  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.initFloatChart1();
    this.initFloatChart2();
  }

  ngOnInit() {

  }

  randValue() {
    return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
  }

  showTooltip(x, y, contents) {
    let tooltipElem = this.renderer.createElement(`<div class="tooltip">${contents}</div>`);
    this.renderer.setStyle(tooltipElem, 'position', 'absolute');
    this.renderer.setStyle(tooltipElem, 'display', 'none');
    this.renderer.setStyle(tooltipElem, 'top', `${y + 5}`);
    this.renderer.setStyle(tooltipElem, 'left', `${x + 15}`);
    this.renderer.setStyle(tooltipElem, 'border', '1px solid #333');
    this.renderer.setStyle(tooltipElem, 'padding', '4px');
    this.renderer.setStyle(tooltipElem, 'color', '#fff');
    this.renderer.setStyle(tooltipElem, 'border-radius', '3px');
    this.renderer.setStyle(tooltipElem, 'background-color', '#333');
    this.renderer.setStyle(tooltipElem, 'opacity', '0.80');

    this.renderer.appendChild(this.el.nativeElement, tooltipElem);
    //.fadeIn(200);
  }

  initFloatChart1() {
    let d1 = [];
    for (let i = 0; i < Math.PI * 2; i += 0.25)
      d1.push([i, Math.sin(i)]);

    let d2 = [];
    for (let i = 0; i < Math.PI * 2; i += 0.25)
      d2.push([i, Math.cos(i)]);

    let d3 = [];
    for (let i = 0; i < Math.PI * 2; i += 0.1)
      d3.push([i, Math.tan(i)]);

    this.options1 = {
      series: {
        lines: {
          show: true,
        },
        points: {
          show: true,
          fill: true,
          radius: 3,
          lineWidth: 1
        }
      },
      xaxis: {
        tickColor: "#eee",
        ticks: [0, [Math.PI / 2, "\u03c0/2"],
          [Math.PI, "\u03c0"],
          [Math.PI * 3 / 2, "3\u03c0/2"],
          [Math.PI * 2, "2\u03c0"]
        ]
      },
      yaxis: {
        tickColor: "#eee",
        ticks: 10,
        min: -2,
        max: 2
      },
      grid: {
        borderColor: "#eee",
        borderWidth: 1
      }
    };

    this.dataset1 = [{
      label: "sin(x)",
      data: d1,
      lines: {
        lineWidth: 1,
      },
      shadowSize: 0
    }, {
      label: "cos(x)",
      data: d2,
      lines: {
        lineWidth: 1,
      },
      shadowSize: 0
    }, {
      label: "tan(x)",
      data: d3,
      lines: {
        lineWidth: 1,
      },
      shadowSize: 0
    }];
  }

  initFloatChart2() {
    let pageviews = [
      [1, this.randValue()],
      [2, this.randValue()],
      [3, 2 + this.randValue()],
      [4, 3 + this.randValue()],
      [5, 5 + this.randValue()],
      [6, 10 + this.randValue()],
      [7, 15 + this.randValue()],
      [8, 20 + this.randValue()],
      [9, 25 + this.randValue()],
      [10, 30 + this.randValue()],
      [11, 35 + this.randValue()],
      [12, 25 + this.randValue()],
      [13, 15 + this.randValue()],
      [14, 20 + this.randValue()],
      [15, 45 + this.randValue()],
      [16, 50 + this.randValue()],
      [17, 65 + this.randValue()],
      [18, 70 + this.randValue()],
      [19, 85 + this.randValue()],
      [20, 80 + this.randValue()],
      [21, 75 + this.randValue()],
      [22, 80 + this.randValue()],
      [23, 75 + this.randValue()],
      [24, 70 + this.randValue()],
      [25, 65 + this.randValue()],
      [26, 75 + this.randValue()],
      [27, 80 + this.randValue()],
      [28, 85 + this.randValue()],
      [29, 90 + this.randValue()],
      [30, 95 + this.randValue()]
    ];

    let visitors = [
      [1, this.randValue() - 5],
      [2, this.randValue() - 5],
      [3, this.randValue() - 5],
      [4, 6 + this.randValue()],
      [5, 5 + this.randValue()],
      [6, 20 + this.randValue()],
      [7, 25 + this.randValue()],
      [8, 36 + this.randValue()],
      [9, 26 + this.randValue()],
      [10, 38 + this.randValue()],
      [11, 39 + this.randValue()],
      [12, 50 + this.randValue()],
      [13, 51 + this.randValue()],
      [14, 12 + this.randValue()],
      [15, 13 + this.randValue()],
      [16, 14 + this.randValue()],
      [17, 15 + this.randValue()],
      [18, 15 + this.randValue()],
      [19, 16 + this.randValue()],
      [20, 17 + this.randValue()],
      [21, 18 + this.randValue()],
      [22, 19 + this.randValue()],
      [23, 20 + this.randValue()],
      [24, 21 + this.randValue()],
      [25, 14 + this.randValue()],
      [26, 24 + this.randValue()],
      [27, 25 + this.randValue()],
      [28, 26 + this.randValue()],
      [29, 27 + this.randValue()],
      [30, 31 + this.randValue()]
    ];

    this.dataset2 = [{
      data: pageviews,
      label: "Unique Visits",
      lines: {
        lineWidth: 1,
      },
      shadowSize: 0

    }, {
      data: visitors,
      label: "Page Views",
      lines: {
        lineWidth: 1,
      },
      shadowSize: 0
    }];

    this.options2 = {
      series: {
        lines: {
          show: true,
          lineWidth: 2,
          fill: true,
          fillColor: {
            colors: [{
              opacity: 0.05
            }, {
              opacity: 0.01
            }]
          }
        },
        points: {
          show: true,
          radius: 3,
          lineWidth: 1
        },
        shadowSize: 2
      },
      grid: {
        hoverable: true,
        clickable: true,
        tickColor: "#eee",
        borderColor: "#eee",
        borderWidth: 1
      },
      colors: ["#d12610", "#37b7f3", "#52e136"],
      xaxis: {
        ticks: 11,
        tickDecimals: 0,
        tickColor: "#eee",
      },
      yaxis: {
        ticks: 11,
        tickDecimals: 0,
        tickColor: "#eee",
      }
    };
  }

  ngAfterViewInit() {
    // this._script.loadScripts('app-charts-flotcharts',
    //   ['assets/vendors/custom/flot/flot.bundle.js',
    //     'assets/demo/default/custom/components/charts/flotcharts.js']);

    $(this.chart1.nativeElement).plot(this.dataset1, this.options1);
    $(this.chart2.nativeElement).plot(this.dataset2, this.options2);

    let previousPoint = null;
    this.renderer.listen(this.chart2.nativeElement, 'plothover', event => {
      console.log(event);
      // $("#x").text(pos.x.toFixed(2));
      // $("#y").text(pos.y.toFixed(2));
      // if (item) {
      //   if (previousPoint != item.dataIndex) {
      //     previousPoint = item.dataIndex;

      //     $("#tooltip").remove();
      //     let x = item.datapoint[0].toFixed(2),
      //     y = item.datapoint[1].toFixed(2);

      //     showTooltip(item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
      //   }
      // } else {
      //   $("#tooltip").remove();
      //   previousPoint = null;
      // }
    });
  }
}
