import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BroadcastTable from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';

const BroadcastWrapper = () => {
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'broadcast' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      <BroadcastTable tableTitle="Broadcast" url={getUrlByAction(selectedFolder)} documentType="broadcast" />
    </React.Fragment>
  );
};

export default BroadcastWrapper;
