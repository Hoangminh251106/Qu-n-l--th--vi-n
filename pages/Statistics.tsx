import React from 'react';

const Statistics: React.FC = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">📊 Thống kê hoạt động thư viện</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
                Dưới đây là các chỉ số thống kê giúp quản trị viên theo dõi hiệu quả hoạt động thư viện:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>📅 Số lượt mượn sách theo tháng/quý/năm</li>
                <li>📚 Top 10 sách được mượn nhiều nhất</li>
                <li>👤 Thành viên tích cực nhất</li>
                <li>📈 Biểu đồ tăng trưởng số lượng sách</li>
                <li>⏱️ Tỷ lệ trả sách đúng hạn</li>
                <li>💬 Phản hồi và đánh giá từ người dùng</li>
            </ul>
            <p className="mt-6 text-gray-700 dark:text-gray-300">
                Các thống kê này sẽ được cập nhật tự động từ dữ liệu hệ thống, giúp bạn đưa ra quyết định quản lý chính xác và kịp thời.
            </p>
        </div>
    );
};

export default Statistics;