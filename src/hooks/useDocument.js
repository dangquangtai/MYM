import { useContext } from 'react';
import DocumentContext from '../contexts/DocumentContext.js';
const useDocument = () => useContext(DocumentContext);

export default useDocument;
