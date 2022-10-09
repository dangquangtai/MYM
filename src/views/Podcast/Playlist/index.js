import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistTable from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
import { apiEndpoints } from './../../../store/constant';

const PlaylistWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  console.log(selectedFolder);
  useEffect(() => {
    async function fetchData() {
      // const categories = await getJobCategories()
      // dispatch({ type: CATEGORY_CHANGE, categories })
      // setCategories(categories)
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'playlist' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <PlaylistTable
        tableTitle="Playlist"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="playlist"
        setActiveUrl={apiEndpoints.set_active_playlist}
        // setFeaturedUrl={}
      />
    </React.Fragment>
  );
};

export default PlaylistWrapper;
