import React from 'react';

import { makeStyles, Card, CardContent, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    revenuecard: {
        position: 'relative',
        color: '#fff',
    },
    revenueicon: {
        position: 'absolute',
        right: '0',
        top: '0',
        '&> svg': {
            width: '100px',
            height: '100px',
            opacity: '0.5',
        },
        [theme.breakpoints.down('xs')]: {
            top: '32px',
            '&> svg': {
                width: '80px',
                height: '80px',
            },
        },
    },
    imgIcon: {
        width: '100px',
        height: '100px',
        opacity: '0.5',
    },
}));

const RevenueCard = (props) => {
    const { primary, secondary, content, iconPrimary, color, image } = props;
    const classes = useStyles();

    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('xs'));

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <Card style={{ background: color }} className={classes.revenuecard}>
            <CardContent>
                <Typography variant="body2" className={classes.revenueicon}>
                    {/* {primaryIcon} */}
                    <img className={classes.imgIcon} alt="logo" src={image} />
                </Typography>
                <Grid container direction={matchDownXs ? 'column' : 'row'} spacing={1}>
                    <Grid item sm={12}>
                        <Typography variant="subtitle1" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="h4" color="inherit">
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="subtitle2" color="inherit">
                            {content}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RevenueCard;
