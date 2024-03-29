export const headCells = [
  { id: 'id', numeric: false, disablePadding: false, label: 'Mã đăng ký', maxWidth: 150 },
  { id: 'image_url', numeric: false, disablePadding: false, label: 'Ảnh', maxWidth: 50 },
  { id: 'career_title', numeric: false, disablePadding: false, label: 'Tên ngành', maxWidth: 50 },
  { id: 'list_title', numeric: false, disablePadding: false, label: 'Tiêu đề', maxWidth: 150 },
  { id: 'order_number', numeric: false, disablePadding: false, label: 'Mã order', maxWidth: 150 },
  { id: 'fullname', numeric: false, disablePadding: false, label: 'Khách hàng', maxWidth: 150 },
  { id: 'title', numeric: false, disablePadding: false, label: 'Tiêu đề', maxWidth: 150 },
  { id: 'voucher_code', numeric: false, disablePadding: false, label: 'Mã voucher', maxWidth: 150 },
  { id: 'card_code', numeric: false, disablePadding: false, label: 'Mã thẻ', maxWidth: 150 },
  { id: 'card_serial', numeric: false, disablePadding: false, label: 'Serial thẻ', maxWidth: 150 },
  { id: 'department_name', numeric: false, disablePadding: false, label: 'Tên phòng ban', maxWidth: 150 },
  { id: 'department_parent', numeric: false, disablePadding: false, label: 'Trực thuộc phòng ban', maxWidth: 150 },
  { id: 'number_member', numeric: false, disablePadding: false, label: 'Số thành viên', maxWidth: 150 },
  { id: 'code_id', numeric: false, disablePadding: false, label: 'Mã tư vấn', maxWidth: 150 },
  { id: 'batch_number', numeric: false, disablePadding: false, label: 'Mã lô', maxWidth: 100 },
  { id: 'university_code', numeric: false, disablePadding: false, label: 'Mã trường', maxWidth: 100 },
  { id: 'university_name', numeric: false, disablePadding: false, label: 'Trường', maxWidth: 100 },
  { id: 'university', numeric: false, disablePadding: false, label: 'Trường', maxWidth: 100 },
  { id: 'account_id', numeric: false, disablePadding: false, label: 'ID', maxWidth: 50 },
  { id: 'full_name', numeric: false, disablePadding: false, label: 'Tên', maxWidth: 150 },
  { id: 'email_address', numeric: false, disablePadding: false, label: 'Email', maxWidth: 100 },
  { id: 'description', numeric: false, disablePadding: false, label: 'Mô tả', maxWidth: 100 },
  { id: 'number_phone', numeric: false, disablePadding: false, label: 'SĐT', maxWidth: 100 },
  { id: 'schedule', numeric: false, disablePadding: false, label: 'Lịch tư vấn', maxWidth: 100 },
  { id: 'career', numeric: false, disablePadding: false, label: 'Ngành', maxWidth: 100 },
  { id: 'assess', numeric: true, disablePadding: false, label: 'Đánh giá', maxWidth: 150 },
  { id: 'matching_code', numeric: false, disablePadding: false, label: 'Mã ghép đôi', maxWidth: 100 },
  { id: 'mentor_email', numeric: false, disablePadding: false, label: 'Mentor Email', maxWidth: 100 },
  { id: 'mentor_name', numeric: false, disablePadding: false, label: 'Mentor', maxWidth: 100 },
  { id: 'mentee_email', numeric: false, disablePadding: false, label: 'Mentee Email', maxWidth: 100 },
  { id: 'mentee_name', numeric: false, disablePadding: false, label: 'Mentee', maxWidth: 100 },
  { id: 'link', numeric: false, disablePadding: false, label: 'Link', maxWidth: 100 },
  { id: 'type', numeric: false, disablePadding: false, label: 'Thể loại', maxWidth: 100 },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Số lượng', maxWidth: 100 },
  { id: 'used_date', numeric: false, disablePadding: false, label: 'Ngày sử dụng', maxWidth: 100 },
  { id: 'expiration_date', numeric: false, disablePadding: false, label: 'Ngày hết hạn', maxWidth: 100 },
  { id: 'cancel_by', numeric: false, disablePadding: false, label: 'Người huỷ', maxWidth: 100 },
  { id: 'status', numeric: false, disablePadding: false, label: 'Trạng thái', maxWidth: 100 },
  { id: 'rating', numeric: false, disablePadding: false, label: 'Đánh giá', maxWidth: 100 },
  { id: 'total', numeric: false, disablePadding: false, label: 'Tổng số', maxWidth: 100 },
  { id: 'uncomplete', numeric: false, disablePadding: false, label: 'Đã lên lịch', maxWidth: 100 },
  { id: 'completed', numeric: false, disablePadding: false, label: 'Hoàn thành', maxWidth: 100 },
  { id: 'reject', numeric: false, disablePadding: false, label: 'Bị huỷ', maxWidth: 100 },
  { id: 'role_template_name', numeric: false, disablePadding: false, label: 'Chức vụ', maxWidth: 100 },
  { id: 'apply_to_department_type', numeric: false, disablePadding: false, label: 'Các phòng ban', maxWidth: 100 },
  { id: 'approval_role', numeric: false, disablePadding: false, label: 'Vai trò phê duyệt', maxWidth: 100 },
  { id: 'address', numeric: false, disablePadding: false, label: 'Địa chỉ', maxWidth: 100 },
  { id: 'price', numeric: false, disablePadding: false, label: 'Giá', maxWidth: 100 },
  { id: 'online', numeric: false, disablePadding: false, label: 'Trực tuyến', maxWidth: 100 },
  { id: 'available', numeric: false, disablePadding: false, label: 'Khả dụng', maxWidth: 100 },
  { id: 'name', numeric: false, disablePadding: false, label: 'Mentor', maxWidth: 100 },
  { id: 'type_collaborator', numeric: false, disablePadding: false, label: 'Chức vụ', maxWidth: 100 },
  { id: 'mentee', numeric: false, disablePadding: false, label: '', maxWidth: 100 },
  { id: 'mentor', numeric: false, disablePadding: false, label: '', maxWidth: 100 },
  { id: 'meeting', numeric: false, disablePadding: false, label: '', maxWidth: 100 },

  { id: 'feedback', numeric: false, disablePadding: false, label: '', maxWidth: 100 },
  {
    id: 'visible_for_selection',
    numeric: false,
    disablePadding: false,
    label: 'Hiển thị trong danh sách chọn',
    maxWidth: 150,
  },
  { id: 'landing_page_name', numeric: false, disablePadding: false, label: 'Tên trang', maxWidth: 150 },
  { id: 'category_code', numeric: false, disablePadding: false, label: 'Mã danh mục', maxWidth: 150 },
  { id: 'category_name', numeric: false, disablePadding: false, label: 'Tên danh mục', maxWidth: 150 },
  { id: 'active', numeric: false, disablePadding: false, label: 'Hoạt động', maxWidth: 100 },
  { id: 'episodes', numeric: false, disablePadding: false, label: 'Số tập', maxWidth: 100 },
  { id: 'duration', numeric: false, disablePadding: false, label: 'Thời gian', maxWidth: 100 },
  { id: 'scheduled_datetime', numeric: false, disablePadding: false, label: 'Lịch gửi', maxWidth: 100 },
  { id: 'created_by', numeric: false, disablePadding: false, label: 'Người tạo', maxWidth: 100 },
  { id: 'created_date', numeric: false, disablePadding: false, label: 'Ngày tạo', maxWidth: 100 },
  { id: 'is_completed', numeric: false, disablePadding: false, label: 'Hoàn thành', maxWidth: 100 },
  { id: 'is_used', numeric: false, disablePadding: false, label: 'Trạng thái', maxWidth: 100 },



  { id: 'is_active', numeric: false, disablePadding: false, label: 'Hoạt động', maxWidth: 150 },
 
  { id: 'is_featured', numeric: false, disablePadding: false, label: 'Nổi bật', maxWidth: 150 },
  { id: 'order_code', numeric: false, disablePadding: false, label: 'Mã order', maxWidth: 150 },
  { id: 'order_title', numeric: false, disablePadding: false, label: 'Tiêu đề', maxWidth: 150 },
  { id: 'payment_type_display', numeric: false, disablePadding: false, label: 'Hình thức thanh toán', maxWidth: 150 },
  { id: 'total_order', numeric: false, disablePadding: false, label: 'Tổng', maxWidth: 150 },
  { id: 'discount_amount', numeric: false, disablePadding: false, label: 'Giảm giá', maxWidth: 150 },
  { id: 'final_total', numeric: false, disablePadding: false, label: 'Tổng cuối', maxWidth: 150 },
  { id: 'status_display', numeric: false, disablePadding: false, label: 'Trạng thái', maxWidth: 150 },
  { id: 'menuButtons', numeric: false, disablePadding: false, label: '', maxWidth: 150 },
];

export const bookingStatusList = [
  'Chờ khách hàng',
  'Chờ mentor',
  'Đã lên lịch tư vấn',
  'Đang tư vấn',
  'Chờ Feedback',
  'Khách hàng chưa xác nhận',
  'Mentor chưa xác nhận',
  'Mentor từ chối lịch',
  'Khách hàng chưa Feedback',
  'Meeting bị gián đoạn',
  'Khách yêu cầu hủy',
  'Mentor yêu cầu hủy',
  'Chưa sử dụng',
  'Đã sử dụng',
  'Không giới hạn',
];
