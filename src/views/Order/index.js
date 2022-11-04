import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderTable from '../Table';
import { getUrlByAction } from '../../utils/utils';
import { DOCUMENT_CHANGE } from '../../store/actions';
// import axiosInstance from '../../services/axios';

const OrderWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

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
      <OrderTable
        tableTitle="Quản lý người dùng"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="order"
        // setFeaturedUrl={}
      />
    </React.Fragment>
  );
};

export default OrderWrapper;
