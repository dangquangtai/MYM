import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CareerTable from '../Table';
import { getUrlByAction } from '../../utils/utils';
import { DOCUMENT_CHANGE } from '../../store/actions';
import { apiEndpoints, careerActions } from '../../store/constant';
// import axiosInstance from '../../services/axios';

const CareerWrapper = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState([]);
  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);
  
  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'career' });
    }
    async function fetchDataList() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'careerlist' });
    
    }
    if (selectedProject) {
      if(selectedFolder.action === careerActions.inactive_list || selectedFolder.action === careerActions.active_list){
        fetchData();
      }
      else {

        fetchDataList()
      }
  }
    
  }, [selectedProject]);

  return (
    <React.Fragment>
      <CareerTable
        tableTitle={selectedFolder.action === careerActions.inactive_list || selectedFolder.action === careerActions.active_list? 'Quản lý ngành': 
        selectedFolder.action === careerActions.categoryactive || selectedFolder.action === careerActions.categoryinactive?'Quản lý danh mục ngành':'Quản lý danh sách ngành'}
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType={selectedFolder.action === careerActions.inactive_list || selectedFolder.action === careerActions.active_list?'career':
        selectedFolder.action === careerActions.categoryactive || selectedFolder.action === careerActions.categoryinactive?'careerCategory':'careerlist' }
        setActiveUrl={selectedFolder.action === careerActions.inactive_list || selectedFolder.action === careerActions.active_list?apiEndpoints.set_active_career: 
          selectedFolder.action === careerActions.categoryactive || selectedFolder.action === careerActions.categoryinactive?apiEndpoints.set_active_career_category:apiEndpoints.set_active_career_list}
        setFeaturedUrl={apiEndpoints.set_featured_career}
      />
    </React.Fragment>
  );
};

export default CareerWrapper;
