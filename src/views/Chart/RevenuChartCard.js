import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/styles';
import { Box, Card, CardContent, CardHeader, Divider, Hidden, Grid, Typography, useMediaQuery } from '@material-ui/core';

const RevenuChartCard = (props) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownXs = useMediaQuery(theme.breakpoints.down('xs'));
    const { label, series } = props;

    const RevenuChartCardData = {
        height: 228,
        type: 'donut',
        options: {
            dataLabels: {
                enabled: false,
            },
            labels: label,
            legend: {
                show: true,
                position: 'bottom',
                fontFamily: 'inherit',
                labels: {
                    colors: 'inherit',
                },
            },
            itemMargin: {
                horizontal: 10,
                vertical: 10,
            },
            colors: [theme.palette.error.main, theme.palette.success.main, theme.palette.warning.main],
        },
        series: series,
      };

    return (
        <Card>
            <CardHeader
                title={
                    <Typography t="div" className="card-header">
                        Thống kê đăng ký
                    </Typography>
                }
            />
            <Divider />
            <CardContent>
                <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
                    <Grid item xs={12} sm={7} md={12}>
                        <Chart {...RevenuChartCardData} />
                    </Grid>
                    <Hidden only="sm">
                        <Grid item>
                            <Divider />
                        </Grid>
                    </Hidden>
                    <Grid
                        item
                        container
                        direction={matchDownMd && !matchDownXs ? 'column' : 'row'}
                        justifyContent="space-around"
                        alignItems="center"
                        xs={12}
                        sm={5}
                        md={12}
                    >
                        <Grid item>
                            <Grid container direction="column">
                                <Typography variant="h6">Youtube</Typography>
                                <Typography variant="subtitle1" style={{ color: theme.palette.primary.main }}>
                                    + 16.85%
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Typography variant="h6">Facebook</Typography>
                                <Box color={theme.palette.success.main}>
                                    <Typography variant="subtitle1" color="inherit">
                                        +45.36%
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Typography variant="h6">Twitter</Typography>
                                <Typography variant="subtitle1" style={{ color: theme.palette.warning.main }}>
                                    - 50.69%
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RevenuChartCard;
