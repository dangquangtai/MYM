import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EventCategoryTable from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
// import axiosInstance from '../../services/axios';
import { apiEndpoints } from './../../../store/constant';

const EventCategoryWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'eventcategory' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <EventCategoryTable
        tableTitle="Event Category"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="eventcategory"
        // setActiveUrl={apiEndpoints.set_active_batch}
        // setFeaturedUrl={}
      />
    </React.Fragment>
  );
};

export default EventCategoryWrapper;
