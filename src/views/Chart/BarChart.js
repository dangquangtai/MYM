import React from 'react';
import Chart from 'react-apexcharts';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Hidden,
  Grid,
  Typography,
} from '@material-ui/core';

const BarChart = ({ categories, series }) => {

  const chartData = {
    height: 250,
    type: 'bar',
    options: {
      chart: {
        type: 'bar',
        height: 200,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
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
            Booking
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
export default BarChart;
