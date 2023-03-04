import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const BannerContext = createContext({});

export const BannerProvider = ({ children }) => {
    const { setView } = useView();

    const createBanner = async (data) => {
        return axiosInstance.post(apiEndpoints.create_new_banner, { outputtype: 'RawJson', ...data }).then((response) => {
            if (response.status === 200 && response.data.return === 200) return true;
            return false;
        });
    };
    const updateBanner = async (data) => {
        return axiosInstance.post(apiEndpoints.update_banner, { outputtype: 'RawJson', ...data }).then((response) => {
            if (response.status === 200 && response.data.return === 200) return true;
            return false;
        });
    };
    const getBannerDetail = async (id) => {
        return axiosInstance.post(apiEndpoints.get_banner_detai, { outputtype: 'RawJson', id }).then((response) => {
            if (response.status === 200 && response.data.return === 200) {
                const { data: news, view } = response.data;
                setView({ ...view, action: 'detail' });
                return news;
            } else return {};
        });
    };


    return (
        <BannerContext.Provider
            value={{
                createBanner,
                updateBanner,
                getBannerDetail,
            }}
        >
            {children}
        </BannerContext.Provider>
    );
};

export default BannerContext;
