import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Hidden,
  Grid,
  Typography,
} from '@material-ui/core';import React from 'react';
import Chart from 'react-apexcharts';

const HoritionalBarChart = ({ categories, series, title, horizontal }) => {
  const chartData = {
    height: 400,
    type: 'bar',
    options: {
      chart: {
        type: 'bar',
        height: 400,
        stacked: true,
        // stackType: '100%'
      },
      plotOptions: {
        bar: {
          horizontal: horizontal,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: categories,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' Booking';
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        // horizontalAlign: 'left',
        // offsetX: 40
      },
    },
    series: series,
  };

  return (
    <Card>
      <CardHeader
        title={
          <Typography t="div" className="card-header">
            {title}
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
export default HoritionalBarChart;
