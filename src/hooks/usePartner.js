import { useContext } from 'react';
import PartnerContext from '../contexts/PartnerContext';
const usePartner = () => useContext(PartnerContext);

export default usePartner;