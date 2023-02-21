import { useContext } from 'react';
import SiteContext from '../contexts/SiteContext';
const useSite = () => useContext(SiteContext);

export default useSite;
