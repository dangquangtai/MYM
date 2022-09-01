import { Card, CardHeader, Typography, Divider, CardContent, Grid } from '@material-ui/core';
import React from 'react';
import Chart from 'react-apexcharts';

const ColofullBarChart = ({ series, colors, categories }) => {
  const chartData = {
    height: 340,
    type: 'bar',
    series: [{
   data: series,
    }],
    options: {
      chart: {
        type: 'bar',

        height: 340
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: false,
          dataLabels: {
            position: 'center'
          },
        }
      },
      colors: colors,
      // dataLabels: {
      //   enabled: true,
      //   textAnchor: 'middle',
       
      //   style: {
      //     colors: ['#fff']
      //   },
      //   formatter: function (val, opt) {
      //     return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      //   },
      //   offsetX: 0,
      //   dropShadow: {
      //     enabled: true
      //   }
      // },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        labels: {
          show: true
        }
      },
      // title: {
      //   text: 'Đánh giá mentor',
      //   align: 'center',
      //   floating: true
      // },
      // subtitle: {
      //   text: 'Category Names as DataLabels inside bars',
      //   align: 'center',
      // },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return 'Người đánh giá:'
            },
          
          }
        }

      },
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          <Typography t="div" className="card-header">
            Đánh giá mentor
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Chart {...chartData} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default ColofullBarChart;
