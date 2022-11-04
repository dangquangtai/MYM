import React, { createContext } from 'react';
import { apiEndpoints } from '../store/constant';
import axiosInstance from '../services/axios';
import useView from '../hooks/useView';

const SaleContext = createContext({});

export const SaleProvider = ({ children }) => {
    const { setView } = useView();
    const getPriceList = async () => {
        return axiosInstance
            .post(apiEndpoints.get_all_counselling_price, { guest: 'true', outputtype: 'RawJson' })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) {
                    const { list } = response.data;
                    return list;
                } else return {};
            });
    };

    const getDetailPrice = async (id) => {
        return axiosInstance
            .post(apiEndpoints.get_detail_counselling_price, { outputtype: 'RawJson', id })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) {
                    const { data: news, view } = response.data;
                    setView({ ...view, action: 'detail' });
                    return news;
                } else return {};
            });
    };
    const createPrice = async (counsellingPrice) => {
        return axiosInstance
            .post(apiEndpoints.create_counselling_price, { outputtype: 'RawJson', ...counsellingPrice })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) return true;
                return false;
            });
    };
    const updatePrice = async (notificationCategory) => {
        return axiosInstance
            .post(apiEndpoints.update_counselling_price, { outputtype: 'RawJson', ...notificationCategory })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) return true;
                return false;
            });
    };

    const getNotificatonMessageList = async () => {
        return axiosInstance
            .post(apiEndpoints.get_all_notification_category, { guest: 'true', outputtype: 'RawJson' })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) {
                    const { data } = response.data;
                    return data;
                } else return {};
            });
    };

    const getDetailNotificatonMessage = async (id) => {
        return axiosInstance
            .post(apiEndpoints.get_detail_notification_message, { outputtype: 'RawJson', id })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) {
                    const { data: news, view } = response.data;
                    setView({ ...view, action: 'detail' });
                    return news;
                } else return {};
            });
    };
    const createNotificationMessage = async (notificationMessage) => {
        return axiosInstance
            .post(apiEndpoints.create_notification_message, { outputtype: 'RawJson', ...notificationMessage })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) return true;
                return false;
            });
    };
    const updateNotificationMessage = async (notificationMessage) => {
        return axiosInstance
            .post(apiEndpoints.update_notification_message, { outputtype: 'RawJson', ...notificationMessage })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) return true;
                return false;
            });
    };

    const addGroup = async (data) => {
        return axiosInstance
            .post(apiEndpoints.add_group_notificaton_message, { outputtype: 'RawJson', ...data })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) return response.data.group_id;
                return false;
            });
    };

    const removeGroup = async (data) => {
        return axiosInstance
            .post(apiEndpoints.remove_group_notificaton_message, { outputtype: 'RawJson', ...data })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) return response.data.group_id;
                return false;
            });
    };
    const getAllCategory = async () => {
        return axiosInstance.post(apiEndpoints.get_all_category, { outputtype: 'RawJson' }).then((response) => {
            if (response.status === 200 && response.data.return === 200) {
                const { list } = response.data;
                return list;
            } else return [];
        });
    };
    const getAllCounsellingCategory = async () => {
        return axiosInstance.post(apiEndpoints.get_list_counselling_category, { outputtype: 'RawJson' }).then((response) => {
            if (response.status === 200 && response.data.return === 200) {
                const { list } = response.data;
                return list;
            } else return [];
        });
    };
    const getListCareer = async (category_id) => {
        return axiosInstance
            .post(apiEndpoints.get_list_career_category, { outputtype: 'RawJson', category_id })
            .then((response) => {
                if (response.status === 200 && response.data.return === 200) {
                    const { list } = response.data;
                    return list;
                } else return {};
            });
    };

    return (
        <SaleContext.Provider
            value={{
                getPriceList,
                getDetailPrice,
                createPrice,
                updatePrice,
                getNotificatonMessageList,
                getDetailNotificatonMessage,
                createNotificationMessage,
                updateNotificationMessage,
                addGroup,
                removeGroup,
                getAllCounsellingCategory,
                getAllCategory,
                getListCareer,
            }}
        >
            {children}
        </SaleContext.Provider>
    );
};

export default SaleContext;
