import { useContext } from 'react';
import OrderContext from '../contexts/OrderContext';
const useOrder = () => useContext(OrderContext);

export default useOrder;
