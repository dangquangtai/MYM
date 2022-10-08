import { useContext } from 'react';
import EventContext from '../contexts/EventContext';
const useEvent = () => useContext(EventContext);

export default useEvent;
