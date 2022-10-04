import { useContext } from 'react';
import MetaDataContext from '../contexts/MetaDataContext.js';
const useMetaData = () => useContext(MetaDataContext);

export default useMetaData;
