import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Box,
  Typography,
  Tab,
  Select,
  FormControl,
  MenuItem,
  TextField,
  InputLabel,
  Snackbar,

} from '@material-ui/core';
import { TreeView, TreeItem, } from '@material-ui/lab';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from './classes.js';
import { FLOATING_MENU_CHANGE, DOCUMENT_CHANGE } from '../../../store/actions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useDepartment from '../../../hooks/useDepartment.js';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TreeViewModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);

  const { getDataTreeView } = useDepartment();
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };


  const { detailDocument: openDialog } = useSelector((state) => state.floatingMenu);
  
  const splitData = (dataList) => {
    let arr2 = [];
    console.log(dataList)
    dataList.forEach(
      data => {
        arr2.push(data.Value.split('/'))
      }
    )
    return arr2;
  }
  const dataTreeView = [];
  const formatDataTreeView = (arr2) => {
    arr2.forEach(data => {
      for (const [i, data2] of data.entries()) {
        if (i === 0 && data.length === 1) {
          dataTreeView.push({ key: data[i], label: data[i], children: [] });
        } else if (i != 0) {
          loopTreeView(data[i - 1], data[i], dataTreeView);
        }
      }
    })
    setData(dataTreeView)

  };


  const loopTreeView = (datapre, dataNew, dataListFormat) => {
    dataListFormat.forEach(dataCheck => {
      dataListFormat.forEach(dataCheckExist => {
        if (dataCheckExist.label === dataNew) {
          return true;
        }
      })

      if (dataCheck.label === datapre) {
        let check = false;
        if (dataCheck.children.length >= 1) {
          dataCheck.children.forEach(dataCheckExist => {
            if (dataCheckExist.label === dataNew) {
              check = true;
            }
          })
          if (check === false) {
            let dataTree = {
              key: dataNew,
              label: dataNew,
              children: [],
            }
            dataCheck.children.push(dataTree);
            return true;
          }

        }
        else {
          let dataTree = {
            key: dataNew,
            label: dataNew,
            children: [],
          }
          dataCheck.children.push(dataTree);
          return true;
        }
      }
      else {
        return loopTreeView(datapre, dataNew, dataCheck.children);
      }
    })

  }
  const [dataShow, setData] = React.useState();
  useEffect(() => {
    async function getData(){
      let data = await getDataTreeView();
      formatDataTreeView(splitData(data));
    }
    getData();
    
    
  }, []);


  const handleCloseDialog = () => {
    setDocumentToDefault();


    dispatch({ type: FLOATING_MENU_CHANGE, detailDocument: false });
  };








  const setDocumentToDefault = async () => {
    setTabIndex(0);

  };

  const renderItem = (data) => {

    if (data.children.length === 0) {
      return <TreeItem nodeId={data.key} label={data.label} />;
    }
    else {
      return <><TreeItem nodeId={data.key} label={data.label}>
        {data.children.map(data2 => (
          <>{renderItem(data2)}</>
        ))}
      </TreeItem></>;
    }
  };
  return (

    <React.Fragment>
      <Grid container>
        <Dialog
          open={openDialog || false}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          className={classes.useradddialog}
        >

          <DialogTitle className={classes.dialogTitle}>
            <Grid item xs={12} style={{ textTransform: 'uppercase' }}>
              Tạo mới phòng ban
            </Grid>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Tabs
                  value={tabIndex}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChangeTab}
                  aria-label="simple tabs example"
                  variant="scrollable"
                >
                  <Tab
                    className={classes.unUpperCase}
                    label={
                      <Typography
                        className={classes.tabLabels}
                        component="span"
                        variant="subtitle1"
                      >

                        Thông tin phòng ban
                      </Typography>
                    }
                    value={0}
                    {...a11yProps(0)}
                  />

                </Tabs>
              </Grid>
              <Grid item xs={12}>
                <TabPanel value={tabIndex} index={0}>
                  <Grid container spacing={1}>
                    <Grid item lg={12} md={12} xs={12}>
                      <div className={classes.tabItem}>
                        <div className={classes.tabItemTitle}>
                          <div className={classes.tabItemLabel}>
                            <AccountCircleOutlinedIcon />
                            <span>Thông tin phòng ban</span>
                          </div>

                        </div>
                        <div className={classes.tabItemBody}>

                          {dataShow && (
                            <TreeView
                              aria-label="file system navigator"
                              defaultCollapseIcon={<ExpandMoreIcon />}
                              defaultExpandIcon={<ChevronRightIcon />}
                              sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}

                            >
                              <>
                                {dataShow.map(data2 => (
                                  <>{renderItem(data2)}</>
                                ))}
                              </>

                            </TreeView>

                          )}








                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justify="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: 'rgb(70, 81, 105)', }}
                  onClick={() => handleCloseDialog()}
                >
                  Đóng
                </Button>
              </Grid>


            </Grid>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
};

export default TreeViewModal;
