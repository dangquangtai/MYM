import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileTable from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
// import axiosInstance from '../../services/axios';
import { apiEndpoints } from './../../../store/constant';

const FileWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'file' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <FileTable
        tableTitle="Tai lieu"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="file"
        // setFeaturedUrl={}
        setActiveUrl={apiEndpoints.set_active_file}
      />
    </React.Fragment>
  );
};

export default FileWrapper;
