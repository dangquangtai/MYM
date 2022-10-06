import { useContext } from 'react';
import MarketingContext from '../contexts/MarketingContext';
const useMarketing = () => useContext(MarketingContext);

export default useMarketing;
