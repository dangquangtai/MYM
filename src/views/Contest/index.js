import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContestTable from '../Table';
import { getUrlByAction } from '../../utils/utils';
import { DOCUMENT_CHANGE } from '../../store/actions';
// import axiosInstance from '../../services/axios';

const ContestWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);
  const [title,setTitle] = React.useState('');
  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'order' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);
  return (
    <React.Fragment>
      <ContestTable
        tableTitle={'Meet UEB Mentor'}
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="contest"
        // setFeaturedUrl={}
      />
    </React.Fragment>
  );
};

export default ContestWrapper;
