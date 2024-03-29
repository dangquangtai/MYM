import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
// import axiosInstance from '../../services/axios';
import { apiEndpoints } from '../../../store/constant';

const QnAWrapper = () => {
    const dispatch = useDispatch();

    const [categories, setCategories] = React.useState([]);

    const { projects } = useSelector((state) => state.project);
    const selectedProject = projects.find((project) => project.selected);
    const { selectedFolder } = useSelector((state) => state.folder);

    useEffect(() => {
        async function fetchData() {
            dispatch({ type: DOCUMENT_CHANGE, documentType: 'qna' });
        }
        if (selectedProject) {
            fetchData();
        }
    }, [selectedProject]);

    return (
        <React.Fragment>
            <Table
                tableTitle="Quản lý câu hỏi"
                url={getUrlByAction(selectedFolder)}
                categories={categories}
                documentType="qna"
            // setFeaturedUrl={apiEndpoints.set_featured_news}
            // setActiveUrl={apiEndpoints.set_active_news}
            />
        </React.Fragment>
    );
};

export default QnAWrapper;
