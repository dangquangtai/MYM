import { useContext } from 'react';
import BannerContext from '../contexts/BannerContext';
const useBanner = () => useContext(BannerContext);

export default useBanner;
