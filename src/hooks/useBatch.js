import { useContext } from 'react';
import BatchContext from '../contexts/BatchContext';
const useBatch = () => useContext(BatchContext);

export default useBatch;
