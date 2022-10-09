import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EpisodeTable from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
// import axiosInstance from '../../services/axios';
import { apiEndpoints } from './../../../store/constant';

const EpisodeWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'episode' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <EpisodeTable
        tableTitle="Episode"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="episode"
        // setFeaturedUrl={}
        setActiveUrl={apiEndpoints.set_active_episode}
      />
    </React.Fragment>
  );
};

export default EpisodeWrapper;
