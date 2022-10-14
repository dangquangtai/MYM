import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../../Table';
import { getUrlByAction } from '../../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../../store/actions';
// import axiosInstance from '../../../../services/axios';
import { apiEndpoints } from './../../../../store/constant';

const PartnerCategoryWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);
  

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'partner_category' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <Table
        tableTitle="Quản lý Partner Category"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="partner_category"
        // setFeaturedUrl={apiEndpoints.set_featured_mentor}
        // setActiveUrl={apiEndpoints.set_active_mentor}
      />
    </React.Fragment>
  );
};

export default PartnerCategoryWrapper;
