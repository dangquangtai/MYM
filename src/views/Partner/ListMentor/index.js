import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BatchTable from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
// import axiosInstance from '../../services/axios';
import { apiEndpoints } from './../../../store/constant';

const ListMentorWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'mentorlist' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <BatchTable
        tableTitle="List Mentor"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="mentorlist"
        setActiveUrl={apiEndpoints.set_active_list_mentor}
        setFeaturedUrl={apiEndpoints.set_featured_list_mentor}
      />
    </React.Fragment>
  );
};

export default ListMentorWrapper;
