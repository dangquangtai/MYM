import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../Table';
import { getUrlByAction } from '../../../utils/utils';
import { DOCUMENT_CHANGE } from '../../../store/actions';
// import axiosInstance from '../../../services/axios';
import { apiEndpoints } from './../../../store/constant';

const CounsellingPriceWrapper = () => {
    const dispatch = useDispatch();

    const [categories, setCategories] = React.useState([]);

    const { projects } = useSelector((state) => state.project);
    const selectedProject = projects.find((project) => project.selected);
    const { selectedFolder } = useSelector((state) => state.folder);

    useEffect(() => {
        async function fetchData() {
            dispatch({ type: DOCUMENT_CHANGE, documentType: 'counsellingPrice' });
        }
        if (selectedProject) {
            fetchData();
        }
    }, [selectedProject]);

    return (
        <React.Fragment>
            <Table
                tableTitle="Quản lý Price"
                url={getUrlByAction(selectedFolder)}
                categories={categories}
                documentType="counsellingPrice"
                // setFeaturedUrl={apiEndpoints.set_featured_mentor}
                setActiveUrl={apiEndpoints.set_active_price}
            />
        </React.Fragment>
    );
};

export default CounsellingPriceWrapper;
