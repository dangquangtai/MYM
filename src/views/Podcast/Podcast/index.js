import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PodcastTable from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
// import axiosInstance from '../../services/axios';
import { apiEndpoints } from './../../../store/constant';

const PodcastWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'podcast' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <PodcastTable
        tableTitle="Podcast"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="podcast"
        setFeaturedUrl={apiEndpoints.set_featured_podcast}
        setActiveUrl={apiEndpoints.set_active_podcast}
      />
    </React.Fragment>
  );
};

export default PodcastWrapper;
