import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useProject from './../../../hooks/useProject';
import { SELECTED_APP_CHANGE } from './../../../store/actions';
import { gridSpacing } from './../../../store/constant';
import AppCard from './Card/index';
import useShare from './../../../hooks/useShare';
import HoverCard from './HoverCard/index';
import { useParams } from 'react-router-dom';
import DetailDocumentDialog from './../../Detail/index';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    height: '100vh',
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
  const [open,setRedirect] = useState(false)
  const { getApps } = useProject();
  const { getMetadata } = useShare();
  const myParam = useLocation().search;
  
  React.useEffect(() => {
    setTimeout(() => {
      getApps();
      getMetadata();
    }, 0);
    
  }, []);
  useEffect(()=>{
    if (apps.length===0) return;
    const id= new URLSearchParams(myParam).get("id");
    const type = new URLSearchParams(myParam).get("type");
    if (!type) return;
    handleSelectedApp(type,id)
    setRedirect(true)
  },[apps])
  const handleAppClick = (app) => {
    dispatch({ type: SELECTED_APP_CHANGE, app });
  };
  const handleSelectedApp = (type,id) =>{
    if(type==='career'){
      var id_app = '528e4614-2b69-11ed-b84b-005056a3c175'
      var id_project='2fa1cc27-b9a3-11ed-83b0-0adcfa65ae7a'
      var action = 'MYM_PARTNER_HOME_OPEN_CAREERLISST_LIST'
      var app = apps.find(item=>item.id===id_app)
      handleAppClick({...app,element_id: id, action:action, id_project: id_project})
    } else if(type==='news') {
      var id_app = '67e880ce-b190-11ed-83b0-0adcfa65ae7a'
      var id_project='8fd81cfc-b191-11ed-83b0-0adcfa65ae7a'
      var action = 'MYM_SITE_HOME_OPEN_NEWSLIST_LIST'
      var app = apps.find(item=>item.id===id_app)
      handleAppClick({...app,element_id: id, action:action, id_project: id_project})
    }
    else if(type==='mentor') {
      var id_app = '528e4614-2b69-11ed-b84b-005056a3c175'
      var id_project='bbbfdc5c-3a8c-11ed-b853-005056a3c175'
      var action = 'MYM_PARTNER_MENTOR_OPEN_LIST_MENTOR_LIST'
      var app = apps.find(item=>item.id===id_app)
      handleAppClick({...app,element_id: id, action:action, id_project: id_project})
    }
    else if(type==='banner') {
      var id_app = '67e880ce-b190-11ed-83b0-0adcfa65ae7a'
      var id_project='7e204137-b983-11ed-83b0-0adcfa65ae7a'
      var action = 'MYM_SITE_HOME_OPEN_BANNERLIST_LIST'
      var app = apps.find(item=>item.id===id_app)
      handleAppClick({...app,element_id: id, action:action, id_project: id_project})
    }
    else if(type==='podcast') {
      var id_app = '1adc72b6-2b69-11ed-b84b-005056a3c175'
      var id_project='71f4fc9f-2b96-11ed-b84b-005056a3c175'
      var action = 'MYM_MEDIA_PODCAST_OPEN_PLAYLIST_LIST'
      var app = apps.find(item=>item.id===id_app)
      handleAppClick({...app,element_id: id, action:action, id_project: id_project})
    }
  }
  return (
    <>
    { open &&(
 <Redirect to="/dashboard/default"/>
    )}
     
      <DetailDocumentDialog />
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h2" className={classes.margin}>
            Meet Your Mentor App Center
          </Typography>
          <Grid container spacing={gridSpacing} alignItems="center">
            {apps.map((app) => (
              <Grid key={app.app_code} item lg={3} sm={6} xs={12}>
                <RouterLink className={classes.link} to="/dashboard/default" onClick={() => handleAppClick(app)}>
                  {/* <AppCard
                  title={app.app_name}
                  // description={app.app_description}
                  image={app.icon}
                  color={app.color}
                /> */}
                  <HoverCard title={app.app_name} image={app.icon} color={app.color} />
                </RouterLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
