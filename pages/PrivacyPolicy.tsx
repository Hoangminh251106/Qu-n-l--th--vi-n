const PrivacyPolicy = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Chính sách bảo mật</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn khi sử dụng hệ thống Thư Viện Số LMS. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">1. Thông tin thu thập</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            <li>Họ tên, email, số điện thoại khi đăng ký tài khoản</li>
            <li>Lịch sử mượn/trả sách và hoạt động trên hệ thống</li>
            <li>Thông tin phản hồi và liên hệ từ người dùng</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">2. Mục đích sử dụng</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            <li>Quản lý tài khoản và hoạt động mượn sách</li>
            <li>Cải thiện trải nghiệm người dùng</li>
            <li>Gửi thông báo, hỗ trợ và phản hồi</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">3. Bảo mật thông tin</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
            Dữ liệu của bạn được lưu trữ an toàn và không chia sẻ với bên thứ ba nếu không có sự đồng ý. Chúng tôi áp dụng các biện pháp kỹ thuật để bảo vệ thông tin khỏi truy cập trái phép.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">4. Quyền của người dùng</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            <li>Yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân</li>
            <li>Yêu cầu cung cấp bản sao dữ liệu đã lưu</li>
            <li>Hủy đăng ký nhận thông báo từ hệ thống</li>
        </ul>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Chính sách này có thể được cập nhật định kỳ. Mọi thay đổi sẽ được thông báo trên hệ thống.
        </p>
    </div>
);

export default PrivacyPolicy;