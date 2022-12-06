import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderTable from '../Table';
import { getUrlByAction } from '../../utils/utils';
import { DOCUMENT_CHANGE } from '../../store/actions';
// import axiosInstance from '../../services/axios';

const OrderWrapper = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);

  const { projects } = useSelector((state) => state.project);
  const selectedProject = projects.find((project) => project.selected);
  const { selectedFolder } = useSelector((state) => state.folder);
  const [title,setTitle] = React.useState('');
  useEffect(() => {
    async function fetchData() {
      dispatch({ type: DOCUMENT_CHANGE, documentType: 'order' });
    }
    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);
  useEffect(() => {
  
  
      let data = getUrlByAction(selectedFolder);
      if (data=== '/Primary/?FlowAlias=bs_api_sales_get_booking_order_list_by_page&action=api'){
        setTitle('Danh sách đơn hàng tư vấn');
      } 
      else if (data=== '/Primary/?FlowAlias=bs_api_sales_get_event_order_list_by_page&action=api'){
        setTitle('Danh sách đơn hàng sự kiện');
      } else {
        setTitle('Danh sách đơn hàng mua mã thẻ');
      }
   
    
  }, [selectedFolder]);

  return (
    <React.Fragment>
      <OrderTable
        tableTitle={title}
        url={getUrlByAction(selectedFolder)}
        categories={categories}
        documentType="order"
        // setFeaturedUrl={}
      />
    </React.Fragment>
  );
};

export default OrderWrapper;
