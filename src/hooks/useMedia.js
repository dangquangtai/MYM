import { useContext } from 'react';
import MediaContext from '../contexts/MediaContext';
const useMedia = () => useContext(MediaContext);

export default useMedia;
