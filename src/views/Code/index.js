import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CodeTable from '../Table';
import { getUrlByAction } from '../../utils/utils';
import { DOCUMENT_CHANGE } from '../../store/actions';
// import axiosInstance from '../../services/axios';

const CodeWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'code' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <CodeTable
        tableTitle="Mã đăng ký"
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="code"
        // setFeaturedUrl={}
      />
    </React.Fragment>
  );
};

export default CodeWrapper;
