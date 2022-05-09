# server
ứng dụng quản lý các đại lý bán hàng cho doanh nghiệp HC
Admin(ceo) được cung cấp một account quản lý toàn bộ data (account : admin, password : Nhatthanh200320)
Thực hiện mô hình phân quyền tránh quá tải công việc cho admin
Admin(ceo) có quyền tạo mới, xóa cửa hàng cũng như bổ nhiệm, xóa chức vụ quản lý cửa hàng(HR)
HR quản lý shop được phân quyền : - bổ nhiệm các chức vụ dưới quyền (sale management , product management)
                                  - quản lý lương các chức vụ dưới quyền
                                  - có thể thay đổi thông tin của cửa hàng
sale management :                 - quản lý mảng bán hàng như thêm, sửa , xóa hóa đơn(bill), hệ thống tự động tính lại giá tiền cũng như kiểm tra tính hợp lệ của voucher
product management :              - quản lý sản phẩm có trong cửa hàng(CRUD)
sử dụng token để tiến hành xác thực sử dụng các chức năng
