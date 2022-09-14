import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const DepartmentContext = createContext({});

export const DepartmentProvider = ({ children }) => {
  const { setView } = useView();

  const getDepartmentDetail = async (department_code) => {
    return axiosInstance
      .post(apiEndpoints.get_department_detail, {
         outputtype: 'RawJson' ,department_code})
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };
  const getDepartmentList = async (department) => {
    return axiosInstance
      .post(apiEndpoints.get_department_list, {
         outputtype: 'RawJson' ,
         ...department,
        })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };
  const getDepartmentTypeList = async (department) => {
    return axiosInstance
      .post(apiEndpoints.get_department_type_list, {
         outputtype: 'RawJson' ,
         ...department,
        })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };
  const getDataTreeView = async () => {
    return axiosInstance
      .post(apiEndpoints.get_tree_view_data, {
         outputtype: 'RawJson' ,
         company_code: 'HNN',
        })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { list: news, view } = response.data;
          return news;
        } else return {};
      });
    };

  const createDepartment = async (department) => {
    return axiosInstance.post(apiEndpoints.create_department, department).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };
  const activeDepartment = async ( department ) => {
    return axiosInstance
     .post(apiEndpoints.deactive_department,{
      outputtype: 'RawJson',
      ...department,

    }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };
  const updateDepartment = async (department) => {
    return axiosInstance.post(apiEndpoints.update_department, department).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  return (
    <DepartmentContext.Provider
      value={{
        getDepartmentDetail,
        createDepartment,
        activeDepartment,
        updateDepartment,
        getDepartmentList,
        getDepartmentTypeList,
        getDataTreeView,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentContext;
