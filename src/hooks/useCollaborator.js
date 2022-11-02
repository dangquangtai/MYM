import { useContext } from 'react';
import CollaboratorContext from '../contexts/CollaboratorContext';
const useCollaborator = () => useContext(CollaboratorContext);

export default useCollaborator;
