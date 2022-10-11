import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BatchTable from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
// import axiosInstance from '../../services/axios';
import { apiEndpoints } from './../../../store/constant';

const CardBatchWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'cardbatch' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <BatchTable
        tableTitle="Prepaid Card Batch"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="cardbatch"
        setActiveUrl={apiEndpoints.set_active_prepaid_card_batch}
        // setFeaturedUrl={}
      />
    </React.Fragment>
  );
};

export default CardBatchWrapper;
