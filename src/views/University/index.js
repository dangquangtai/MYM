import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UniveristyTable from '../Table';
import { getUrlByAction } from '../../utils/utils';
import { DOCUMENT_CHANGE } from '../../store/actions';
import { apiEndpoints, universityActions } from '../../store/constant';
// import axiosInstance from '../../services/axios';

const UniveristyWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'university' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <UniveristyTable
        tableTitle={selectedFolder.action === universityActions.inactive_list || selectedFolder.action === universityActions.active_list? 'Quản lý trường':'Quản lý danh sách trường'}
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType={selectedFolder.action === universityActions.inactive_list || selectedFolder.action === universityActions.active_list? 'university':'universitylist'}
        setActiveUrl={selectedFolder.action === universityActions.inactive_list || selectedFolder.action === universityActions.active_list? apiEndpoints.active_university:apiEndpoints.active_universitylist}
      />
    </React.Fragment>
  );
};

export default UniveristyWrapper;
