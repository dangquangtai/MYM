import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Slide,
  Box,
  Toolbar
} from '@material-ui/core';
import clsx from 'clsx';
import { TreeView, TreeItem, } from '@material-ui/lab';
import { gridSpacing } from '../../../store/constant';

import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from './classes.js';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useDepartment from '../../../hooks/useDepartment.js';
import './index.css';
import UserDepartModal from '../UpdateUserDept/index.js';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const TreeViewModal = (props) => {
  const {
    handleUpdateDepartment,
    handleCreateDepartment,
    documents
  } = props;
  const classes = useStyles();

  const { getDataTreeView } = useDepartment();
  const [openUserForm, setOpenUser] = useState(false);
  const [department_code, setDepartmentCode] = useState();

  const splitData = (dataList) => {
    let arr2 = [];
    dataList.forEach(
      data => {
        if (data.Value.split('/').length != 0) {
          arr2.push(data.Value.split('/'))
        }

      }
    )
    return arr2;
  }
  const dataTreeView = [];
  const formatDataTreeView = (arr2, dataSimpleValue) => {
    arr2.forEach((data, index) => {
      for (const [i, data2] of data.entries()) {
        if (i === 1 && data.length === 2) {
          dataTreeView.push({ key: dataSimpleValue[index].Key, label: data[i], children: [] });
        } else if (i != 1 && i != 0) {
     
          loopTreeView(data[i - 1], data[i], dataTreeView, dataSimpleValue[index].Key );
        }
      }
    })
    setData(dataTreeView)

  };
  const loopTreeView = (datapre, dataNew, dataListFormat, Key) => {

    dataListFormat.forEach(dataCheck => {
      dataListFormat.forEach(dataCheckExist => {
        if (dataCheckExist.key === Key) {
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

            if (!!dataNew) {

              let dataTree = {
                key: Key,
                label: dataNew,
                children: [],
              }
              dataCheck.children.push(dataTree);
            }
            return true;
          }

        }
        else {
          if (!!dataNew) {
            let dataTree = {
              key: Key,
              label: dataNew,
              children: [],
            }
            dataCheck.children.push(dataTree);
          }
          return true;
        }
      }
      else {
        return loopTreeView(datapre, dataNew, dataCheck.children, Key);
      }
    })
  }
  const [dataShow, setData] = React.useState();
  useEffect(() => {
   
     
    formatDataTreeView(splitData(documents), documents);
    
  


  }, [documents]);



  const handleClickOpen = (data) => {
    setDepartmentCode(data);
  }
  const handleClose = () => {
    setOpenUser(false);
  }
  const handleClickOpenUserFORM = () => {
    setOpenUser(true);
  }
  const renderItem = (data) => {

    if (data.children.length === 0) {
      return <TreeItem nodeId={data.label} label={data.label} key={data.label}
        onClick={(event) => handleClickOpen(data.key)} className={classes.MuiTreeItemlabel} />;
    }
    else {
      return <TreeItem nodeId={data.label} label={data.label} key={data.label}
       onClick={(event) => handleClickOpen(data.key)} >
        {data.children.map((data2) =>
          renderItem(data2)
        )}
      </TreeItem>;
    }
  };
  return (
    <React.Fragment>
      <UserDepartModal
        isOpen={openUserForm}
        department_code={department_code}
        handleClose={handleClose}
      />
     
      <Grid container justify="flex-start" spacing={gridSpacing} style={{margin: '0 4px ',}}>
        <Grid item>
          <Button variant="contained" color={'primary'} onClick={() => handleCreateDepartment()} >
            {'Tạo mới'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color={'primary'} onClick={() => handleUpdateDepartment(department_code)}>
            {'Cập nhật'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color={'primary'} onClick={() => handleClickOpenUserFORM()}>
            {'Cập nhật người dùng'}
          </Button>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <div className={classes.tabItemBody} style={{  overflow: 'hidden', textOverflow: 'ellipsis',maxHeight:500,minHeight:500,background:'#FFF' }} >
            {dataShow && (
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              >
                <>
                  {dataShow.map((data) =>
                    renderItem(data)
                  )}
                </>

              </TreeView>
            )}
          </div>
        </Grid>
      </Grid>
     
    </React.Fragment>
  );
};

export default TreeViewModal;
