const TermsOfService = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Điều khoản dịch vụ</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
            Khi sử dụng hệ thống Thư Viện Số LMS, bạn đồng ý tuân thủ các điều khoản dưới đây nhằm đảm bảo quyền lợi và trách nhiệm của cả người dùng và quản trị viên.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">1. Quy định sử dụng</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            <li>Không sử dụng hệ thống vào mục đích trái pháp luật</li>
            <li>Không chia sẻ tài khoản hoặc thông tin truy cập</li>
            <li>Không gây ảnh hưởng đến hoạt động của hệ thống</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">2. Trách nhiệm người dùng</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            <li>Bảo mật thông tin đăng nhập</li>
            <li>Chịu trách nhiệm về nội dung phản hồi và hành vi sử dụng</li>
            <li>Thông báo kịp thời khi phát hiện lỗi hoặc hành vi bất thường</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">3. Quyền của hệ thống</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            <li>Chỉnh sửa, tạm ngưng hoặc chấm dứt tài khoản vi phạm</li>
            <li>Cập nhật nội dung và chức năng hệ thống mà không cần báo trước</li>
            <li>Lưu trữ và phân tích dữ liệu để cải thiện dịch vụ</li>
        </ul>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Việc tiếp tục sử dụng hệ thống sau khi điều khoản được cập nhật đồng nghĩa với việc bạn đồng ý với các thay đổi đó.
        </p>
    </div>
);

export default TermsOfService;