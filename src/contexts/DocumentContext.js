import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const DocumentContext = createContext({});

export const DocumentProvider = ({ children }) => {
  const { setView } = useView();

  const getCatgeoryAndType = async () => {
    return axiosInstance.post(apiEndpoints.get_file_type_and_category, { outputtype: 'RawJson' }).then((response) => {
      if (response.status === 200 && response.data.return === 200) {
        const data = response.data;
        return data;
      } else return [];
    });
  };

  const getFileDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_detail_file, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };

  const createFile = async (data) => {
    return axiosInstance.post(apiEndpoints.create_file, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updateFile = async (data) => {
    return axiosInstance.post(apiEndpoints.update_file, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const getFileCategoryDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_detail_file_category, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };

  const createFileCategory = async (data) => {
    return axiosInstance
      .post(apiEndpoints.create_file_category, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const updateFileCategory = async (data) => {
    return axiosInstance
      .post(apiEndpoints.update_file_category, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return true;
        return false;
      });
  };

  const addGroup = async (data) => {
    return axiosInstance
      .post(apiEndpoints.add_group_file_category, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return response.data.group_id;
        return false;
      });
  };

  const removeGroup = async (data) => {
    return axiosInstance
      .post(apiEndpoints.remove_group_file_category, { outputtype: 'RawJson', ...data })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) return response.data.group_id;
        return false;
      });
  };

  const getFileTypeDetail = async (id) => {
    return axiosInstance
      .post(apiEndpoints.get_detail_file_type, {
        outputtype: 'RawJson',
        id,
      })
      .then((response) => {
        if (response.status === 200 && response.data.return === 200) {
          const { data: news, view } = response.data;
          setView({ ...view, action: 'detail' });
          return news;
        } else return {};
      });
  };

  const createFileType = async (data) => {
    return axiosInstance.post(apiEndpoints.create_file_type, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  const updateFileType = async (data) => {
    return axiosInstance.post(apiEndpoints.update_file_type, { outputtype: 'RawJson', ...data }).then((response) => {
      if (response.status === 200 && response.data.return === 200) return true;
      return false;
    });
  };

  return (
    <DocumentContext.Provider
      value={{
        getCatgeoryAndType,
        getFileDetail,
        createFile,
        updateFile,
        getFileCategoryDetail,
        createFileCategory,
        updateFileCategory,
        addGroup,
        removeGroup,
        getFileTypeDetail,
        createFileType,
        updateFileType,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentContext;
