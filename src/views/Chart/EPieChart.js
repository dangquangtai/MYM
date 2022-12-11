import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';

const EPieChart = ({ name, series, title, percent, height = '300px' }) => {
  const chartRef = React.useRef(null);

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    tooltip: {
      trigger: 'item',

      formatter: percent
        ? function (params) {
            return `${params.seriesName}<br />
                ${params.name}: ${params.data.value} (${params.percent}%)<br />`;
          }
        : undefined,
    },
    legend: {
      orient: 'horizontal',

      bottom: 10,
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '50%',
        data: series,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const iconBooking = <Typography className="card-header">{title}</Typography>;

  React.useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.getEchartsInstance().resize();
    }
  }, [chartRef]);

  return (
    <Card>
      <CardHeader title={iconBooking} />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReactECharts ref={chartRef} style={{ minHeight: height }} option={option} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default EPieChart;
