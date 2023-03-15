import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const CounsellingCategoryContext = createContext({});

export const CounsellingCategoryProvider = ({ children }) => {
    const { setView } = useView();

    const getCounsellingCategoryDetail = async (id) => {
        return axiosInstance.post(apiEndpoints.get_counselling_category_detail, { outputtype: 'RawJson', id }).then((response) => {
            if (response.status === 200 && response.data.return === 200) {
                const { data: news, view } = response.data;
                setView({ ...view, action: 'detail' });
                return news;
            } else return {};
        });
    };

    const updateCounsellingCategory = async (data) => {
        return axiosInstance.post(apiEndpoints.update_counselling_category, {
            outputtype: 'RawJson',
            ...data
        }).then((response) => {
            if (response.status === 200 && response.data.return === 200) return true;
            return false;
        });
    };

    const createCounsellingCategory = async (data) => {
        return axiosInstance
            .post(apiEndpoints.create_counselling_category, {
                outputtype: 'RawJson',
                ...data,
            })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) return true;
                return false;
            });
    };

    const getMenuItemList = async () => {
        return axiosInstance
            .post(apiEndpoints.get_list_menu_item, {
                outputtype: 'RawJson',
            })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) {
                    const { list } = response.data;
                    return list;
                } else return {};
            });
    };



    return (
        <CounsellingCategoryContext.Provider
            value={{
                createCounsellingCategory,
                updateCounsellingCategory,
                getCounsellingCategoryDetail,
                getMenuItemList
            }}
        >
            {children}
        </CounsellingCategoryContext.Provider>
    );
};

export default CounsellingCategoryContext;
