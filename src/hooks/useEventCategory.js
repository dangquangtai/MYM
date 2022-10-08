import { useContext } from 'react';
import EventCategoryContext from '../contexts/EventCategoryContext';
const useEventCategory = () => useContext(EventCategoryContext);

export default useEventCategory;
