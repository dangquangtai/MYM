import value from '../../assets/scss/_themes-vars.scss';
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, Typography, Divider, CardContent, Grid } from '@material-ui/core';

const PieChart = ({ labels, series }) => {
  const chartData = {
    height: 340,
    type: 'pie',
    options: {
      labels: labels,
      legend: {
        show: true,
        position: 'right',
        fontFamily: 'inherit',
        labels: {
          colors: 'inherit',
        },
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        },
      },
      theme: {
        monochrome: {
          enabled: false,
          color: value.warning,
        },
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

export default PieChart;
