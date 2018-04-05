//== Class definition
var FlotchartsDemo = function() {
  var demo3 = function() {
    var sin = [],
    cos = [];
    for (var i = 0; i < 14; i += 0.1) {
      sin.push([i, Math.sin(i)]);
      cos.push([i, Math.cos(i)]);
    }

    plot = $.plot($("#m_flotcharts_3"), [{
      data: sin,
      label: "sin(x) = -0.00",
      lines: {
        lineWidth: 1,
      },
      shadowSize: 0
      }, {
      data: cos,
      label: "cos(x) = -0.00",
      lines: {
        lineWidth: 1,
      },
      shadowSize: 0
      }], {
      series: {
        lines: {
          show: true
        }
      },
      crosshair: {
        mode: "x"
      },
      grid: {
        hoverable: true,
        autoHighlight: false,
        tickColor: "#eee",
        borderColor: "#eee",
        borderWidth: 1
      },
      yaxis: {
        min: -1.2,
        max: 1.2
      }
    });

    var legends = $("#m_flotcharts_3 .legendLabel");
    legends.each(function() {
      // fix the widths so they don't jump around
      $(this).css('width', $(this).width());
    });

    var updateLegendTimeout = null;
    var latestPosition = null;

    function updateLegend() {
    updateLegendTimeout = null;

    var pos = latestPosition;

    var axes = plot.getAxes();
    if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max || pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) return;

    var i, j, dataset = plot.getData();
    for (i = 0; i < dataset.length; ++i) {
      var series = dataset[i];

        // find the nearest points, x-wise
        for (j = 0; j < series.data.length; ++j)
          if (series.data[j][0] > pos.x) break;

        // now interpolate
        var y, p1 = series.data[j - 1],
        p2 = series.data[j];

        if (p1 == null) y = p2[1];
        else if (p2 == null) y = p1[1];
        else y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);

        legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
      }
    }

    $("#m_flotcharts_3").bind("plothover", function(event, pos, item) {
      latestPosition = pos;
      if (!updateLegendTimeout) updateLegendTimeout = setTimeout(updateLegend, 50);
    });
  }

  var demo4 = function() {

    var data = [];
    var totalPoints = 250;

  // random data generator for plot charts

  function getRandomData() {
    if (data.length > 0) data = data.slice(1);
      // do a random walk
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50;
        var y = prev + Math.random() * 10 - 5;
        if (y < 0) y = 0;
        if (y > 100) y = 100;
        data.push(y);
      }
      // zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]]);
      }

      return res;
    }

  //server load
  var options = {
    series: {
      shadowSize: 1
    },
    lines: {
      show: true,
      lineWidth: 0.5,
      fill: true,
      fillColor: {
        colors: [{
          opacity: 0.1
        }, {
          opacity: 1
        }]
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickColor: "#eee",
      tickFormatter: function(v) {
        return v + "%";
      }
    },
    xaxis: {
      show: false,
    },
    colors: ["#6ef146"],
    grid: {
      tickColor: "#eee",
      borderWidth: 0,
    }
  };

  var updateInterval = 30;
  var plot = $.plot($("#m_flotcharts_4"), [getRandomData()], options);

  function update() {
    plot.setData([getRandomData()]);
    plot.draw();
    setTimeout(update, updateInterval);
  }

  update();
}

var demo5 = function() {
  var d1 = [];
  for (var i = 0; i <= 10; i += 1)
    d1.push([i, parseInt(Math.random() * 30)]);

  var d2 = [];
  for (var i = 0; i <= 10; i += 1)
    d2.push([i, parseInt(Math.random() * 30)]);

  var d3 = [];
  for (var i = 0; i <= 10; i += 1)
    d3.push([i, parseInt(Math.random() * 30)]);

  var stack = 0,
  bars = true,
  lines = false,
  steps = false;

  function plotWithOptions() {
    $.plot($("#m_flotcharts_5"),
      [{
        label: "sales",
        data: d1,
        lines: {
          lineWidth: 1,
        },
        shadowSize: 0
      }, {
        label: "tax",
        data: d2,
        lines: {
          lineWidth: 1,
        },
        shadowSize: 0
      }, {
        label: "profit",
        data: d3,
        lines: {
          lineWidth: 1,
        },
        shadowSize: 0
      }], {
        series: {
          stack: stack,
          lines: {
            show: lines,
            fill: true,
            steps: steps,
            lineWidth: 0, // in pixels
          },
          bars: {
            show: bars,
            barWidth: 0.5,
            lineWidth: 0, // in pixels
            shadowSize: 0,
            align: 'center'
          }
        },
        grid: {
          tickColor: "#eee",
          borderColor: "#eee",
          borderWidth: 1
        }
      }
    );
  }

  $(".stackControls input").click(function(e) {
    e.preventDefault();
    stack = $(this).val() == "With stacking" ? true : null;
    plotWithOptions();
  });

  $(".graphControls input").click(function(e) {
    e.preventDefault();
    bars = $(this).val().indexOf("Bars") != -1;
    lines = $(this).val().indexOf("Lines") != -1;
    steps = $(this).val().indexOf("steps") != -1;
    plotWithOptions();
  });

  plotWithOptions();
}

var demo6 = function() {
  // bar chart:
  var data = GenerateSeries(0);

  function GenerateSeries(added) {
    var data = [];
    var start = 100 + added;
    var end = 200 + added;

    for (i = 1; i <= 20; i++) {
      var d = Math.floor(Math.random() * (end - start + 1) + start);
      data.push([i, d]);
      start++;
      end++;
    }

    return data;
  }

  var options = {
    series: {
      bars: {
        show: true
      }
    },
    bars: {
      barWidth: 0.8,
          lineWidth: 0, // in pixels
          shadowSize: 0,
          align: 'left'
        },

        grid: {
          tickColor: "#eee",
          borderColor: "#eee",
          borderWidth: 1
        }
      };

      $.plot($("#m_flotcharts_6"), [{
        data: data,
        lines: {
          lineWidth: 1,
        },
        shadowSize: 0
      }], options);
    }

    var demo7 = function() {
  // horizontal bar chart:

  var data1 = [
  [10, 10],
  [20, 20],
  [30, 30],
  [40, 40],
  [50, 50]
  ];

  var options = {
    series: {
      bars: {
        show: true
      }
    },
    bars: {
      horizontal: true,
      barWidth: 6,
          lineWidth: 0, // in pixels
          shadowSize: 0,
          align: 'left'
        },
        grid: {
          tickColor: "#eee",
          borderColor: "#eee",
          borderWidth: 1
        }
      };

      $.plot($("#m_flotcharts_7"), [data1], options);
    }


    var demo8 = function() {
      var data = [];
      var series = Math.floor(Math.random() * 10) + 1;
      series = series < 5 ? 5 : series;

      for (var i = 0; i < series; i++) {
        data[i] = {
          label: "Series" + (i + 1),
          data: Math.floor(Math.random() * 100) + 1
        };
      }

      $.plot($("#m_flotcharts_8"), data, {
        series: {
          pie: {
            show: true
          }
        }
      });
    }

    var demo9 = function() {
     var data = [];
     var series = Math.floor(Math.random() * 10) + 1;
     series = series < 5 ? 5 : series;

     for (var i = 0; i < series; i++) {
      data[i] = {
        label: "Series" + (i + 1),
        data: Math.floor(Math.random() * 100) + 1
      };
    }

    $.plot($("#m_flotcharts_9"), data, {
      series: {
        pie: {
          show: true
        }
      },
      legend: {
        show: false
      }
    });
  }

  var demo10 = function() {
   var data = [];
   var series = Math.floor(Math.random() * 10) + 1;
   series = series < 5 ? 5 : series;

   for (var i = 0; i < series; i++) {
    data[i] = {
      label: "Series" + (i + 1),
      data: Math.floor(Math.random() * 100) + 1
    };
  }

  $.plot($("#m_flotcharts_10"), data, {
    series: {
      pie: {
        show: true,
        radius: 1,
        label: {
          show: true,
          radius: 1,
          formatter: function(label, series) {
            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
          },
          background: {
            opacity: 0.8
          }
        }
      }
    },
    legend: {
      show: false
    }
  });
}

var demo11 = function() {
  var data = [];
  var series = Math.floor(Math.random() * 10) + 1;
    series = series < 5 ? 5 : series;

  for (var i = 0; i < series; i++) {
    data[i] = {
      label: "Series" + (i + 1),
      data: Math.floor(Math.random() * 100) + 1
    };
  }

  $.plot($("#m_flotcharts_11"), data, {
    series: {
      pie: {
        show: true,
        radius: 1,
        label: {
          show: true,
          radius: 1,
          formatter: function(label, series) {
            return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
          },
          background: {
            opacity: 0.8
          }
        }
      }
    },
    legend: {
      show: false
    }
  });
}


  return {
    // public functions
    init: function() {
      // default charts
      demo3();
      demo4();
      demo5();
      demo6();
      demo7();

      // pie charts
      demo8();
      demo9();
      demo10();
      demo11();
    }
  };
}();

jQuery(document).ready(function() {
  FlotchartsDemo.init();
});
