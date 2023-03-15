import { useContext } from 'react';
import CounsellingCategoryContext from '../contexts/CounsellingCategoryContext';

const useCounsellingCategory = () => useContext(CounsellingCategoryContext);

export default useCounsellingCategory;
