import React from 'react';

const Features: React.FC = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">✨ Tính năng nổi bật</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
                Hệ thống quản lý thư viện trực tuyến mang đến trải nghiệm hiện đại, tiện lợi và hiệu quả cho người dùng. Dưới đây là những tính năng chính:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>📚 Quản lý sách: thêm, sửa, xóa, phân loại và theo dõi số lượng tồn kho.</li>
                <li>👥 Quản lý thành viên: đăng ký, cập nhật hồ sơ, phân quyền truy cập.</li>
                <li>🔄 Mượn và trả sách: ghi nhận lịch sử, trạng thái, hạn trả và cảnh báo trễ hạn.</li>
                <li>📈 Thống kê hoạt động: báo cáo số lượt mượn, sách yêu thích, thành viên tích cực.</li>
                <li>🔍 Tìm kiếm thông minh: theo tên sách, tác giả, thể loại hoặc trạng thái mượn.</li>
                <li>🌐 Truy cập mọi lúc mọi nơi: hỗ trợ đa thiết bị, không cần cài đặt phần mềm.</li>
            </ul>
        </div>
    );
};

export default Features;