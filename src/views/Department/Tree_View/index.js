import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Slide,
  Box,
  Toolbar
} from '@material-ui/core';
import { TreeView } from '@material-ui/lab';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeItemClassKey from '@material-ui/lab/TreeItem/TreeItem';
import useStyles from './classes.js';
import useDepartment from '../../../hooks/useDepartment.js';
import './index.css';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useDispatch } from 'react-redux';
import { DOCUMENT_CHANGE, FLOATING_MENU_CHANGE } from '../../../store/actions.js';
import useProcessRole from '../../../hooks/useProcessRole.js';
// web.cjs is required for IE11 support

const TreeViewModal = (props) => {
  const {
    documents,
    documentType,
    setSelectedDepartment,
    setSelectedProcessRole
  } = props;
  const {getDataTreeView} = useDepartment();
  const {getRoleTree } = useProcessRole();
  const classes = useStyles();
  const [openUserForm, setOpenUser] = useState(false);
  const [department_code, setDepartmentCode] = useState();
  const dispatch = useDispatch();
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

          loopTreeView(data[i - 1], data[i], dataTreeView, dataSimpleValue[index].Key);
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
    const fetch = async() =>{
      if (documentType=== 'department'){
        let data = await getDataTreeView();
        formatDataTreeView(splitData(data), data);
      }
      else{
        let data = await getRoleTree();
        formatDataTreeView(splitData(data), data);
      }
      
      
    }
    fetch()
  }, [documents]);
  const handleClickOpen = (data) => {
        if (documentType==='department'){
          setSelectedDepartment(data);
        }
        else {
          setSelectedProcessRole(data);
        }
        
  }
  const handleClose = () => {
    setOpenUser(false);
  }
  const handleClickOpenUserFORM = () => {
    setOpenUser(true);
  }
  const renderItem = (data) => {
    if (data.children.length === 0) {
      return <TreeItem nodeId={data.key} label={data.label} key={data.label}
        onClick={(event) => handleClickOpen(data.key)} className={TreeItemClassKey.MuiTreeItemlabel} />;
    }
    else {
      return <TreeItem nodeId={data.key} label={data.label} key={data.label}
        onClick={(event) => handleClickOpen(data.key)} >
        {data.children.map((data2) =>
          renderItem(data2)
        )}
      </TreeItem>;
    }
  };

  function MinusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  }

  function PlusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  }

  function CloseSquare(props) {
    return (
      <SvgIcon
        className="close"
        fontSize="inherit"
        style={{ width: 14, height: 14 }}
        {...props}
      >
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
      </SvgIcon>
    );
  }

  return (
    <React.Fragment>
      {/* <UserDepartModal
        isOpen={openUserForm}
        department_code={department_code}
        handleClose={handleClose}
      /> */}
   
          <div style={{ maxHeight: 500, minHeight: 500,  marginTop: 10 ,background: '#fff',
                        boxShadow: '0 2px 6px -1px rgb(0 0 0 / 10%)',}} >
            {dataShow && (
              <TreeView
                style={{padding: 5, minHeight: 500, background: '#fff', }}
                aria-label="file system navigator"
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<PlusSquare />}
             
                sx={{ height: 264, flexGrow: 1, maxWidth: 200, overflowY: 'auto' }}
              >
                <>
                  {dataShow.map((data) =>
                    renderItem(data)
                  )}
                </>
              </TreeView>
            )}
          </div>
  

    </React.Fragment>
  );
};

export default TreeViewModal;
