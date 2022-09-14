import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Typography, makeStyles, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useProject from './../../../hooks/useProject';
import { APP_CHANGE, SELECTED_APP_CHANGE } from './../../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    // height: '100vh',
    minHeight: '100%',
  },
  backButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%',
    },
    maxWidth: '475px',
    margin: '24px auto',
  },
  content: {
    padding: theme.spacing(5, 4, 3, 4),
  },
  forgot: {
    textDecoration: 'none',
    paddingLeft: '16px',
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  logoSize: {
    width: '100%',
    height: '50px',
  },
  link: {
    textDecoration: 'none',
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { apps } = useSelector((state) => state.app);

  const { getApps } = useProject();

  React.useEffect(() => {
    setTimeout(() => {
      getApps();
    }, 0);
  }, []);

  const handleAppClick = (app) => {
    dispatch({ type: SELECTED_APP_CHANGE, app });
  };

  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={11} sm={7} md={6} lg={4}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Grid container direction="column" spacing={4} justify="center">
              <Grid item xs={12}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography color="textPrimary" gutterBottom variant="h2">
                      Chọn APP
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Chọn APP để vào hệ thống
                    </Typography>
                  </Grid>
                  <Grid item>
                    <RouterLink to="/" className={classes.icon}></RouterLink>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <List>
                  {apps.map((app) => (
                    <RouterLink className={classes.link} key={app.app_code} to="/dashboard/default" onClick={() => handleAppClick(app.id)}>
                      <ListItem button>
                        {/* <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon> */}
                        <ListItemText primary={app.app_name} />
                      </ListItem>
                    </RouterLink>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default App;
