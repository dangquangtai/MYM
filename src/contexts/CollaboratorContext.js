import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const CollaboratorContext = createContext({});

export const CollaboratorProvider = ({ children }) => {
  const { setView } = useView();

  const getDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_collaboration_detail, {
         outputtype: 'RawJson' ,id})
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };
  const setVerified = async (id, value) => {
    return axiosInstance
      .post(apiEndpoints.set_verified, {
         outputtype: 'RawJson'
        ,id: id,
      value:value})
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          
          return true;
        } else return false;
      });
  };


  return (
    <CollaboratorContext.Provider
      value={{
        getDetail,
        setVerified,
      }}
    >
      {children}
    </CollaboratorContext.Provider>
  );
};

export default CollaboratorContext;
