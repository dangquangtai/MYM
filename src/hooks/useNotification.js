import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContex';
const useNotification = () => useContext(NotificationContext);

export default useNotification;
