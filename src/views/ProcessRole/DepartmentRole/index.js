import React, { useEffect, useState } from 'react';
import {

  Slide,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Box,

} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { gridSpacing, view } from '../../../store/constant';
import useView from '../../../hooks/useView';
import { style, useStyles } from './../../Table/style';

import useDepartment from '../../../hooks/useDepartment';
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

const ProcessRoleDeptModal = (props) => {
  const {
    process_role_code_selected,
    change
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { form_buttons: formButtons, name, tabs, disabled_fields } = useView();
  const buttonSave = formButtons.find((button) => button.name === view.department.detail.save);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  const [DeptList, setDeptList] = React.useState([]);
  const { getDepartmentList, getDeptListByProcessRole} = useDepartment();
  useEffect(() => {
    const fetchData = async () => {
      let data = await getDeptListByProcessRole(process_role_code_selected, 1, 50);
      setDeptList(data);
    }
    fetchData()
  }, [process_role_code_selected]);

  return (

    <React.Fragment>

      <TableContainer>
        <Table
          stickyHeader
          className={classes.table3}
          aria-labelledby="tableTitle"
          size={'medium'}
        // aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Phòng ban</TableCell>
              <TableCell align="right">Chức vụ</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DeptList?.map((row, index) => {
             
              return (
                <TableRow
                  className={classes.tableRow}
                  hover
                 
                  tabIndex={-1}
                  key={row.key}
     
                >
                 
           
                    <TableCell align="left">
                      <div className={classes.tableItemID} >
                        <div>{row.value.split('-')[0]}</div>
                       
                      </div>
                    </TableCell>
             
               
                    <TableCell align="left">
                      <>
                        <span
                          className={classes.tableItemName}
                        
                        >
                      <div>{row.value.split('-')[1]}</div>
                        </span>
                      </>
                    </TableCell>
                  </TableRow>
               
              )
            })}
            </TableBody>
            </Table>
            </TableContainer>
    </React.Fragment>
              );
            };

            export default ProcessRoleDeptModal;
