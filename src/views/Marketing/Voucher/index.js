import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VoucherTable from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
// import axiosInstance from '../../services/axios';

const VoucherWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'voucher' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <VoucherTable
        tableTitle="Voucher"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="voucher"
        // setFeaturedUrl={}
      />
    </React.Fragment>
  );
};

export default VoucherWrapper;
