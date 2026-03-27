import React from 'react';

const Introduction: React.FC = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">📖 Giới thiệu hệ thống</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                Hệ thống thư viện số được xây dựng nhằm hiện đại hóa công tác quản lý thư viện truyền thống, giúp người dùng dễ dàng tiếp cận tri thức mọi lúc mọi nơi.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                Với nền tảng công nghệ điện toán đám mây, hệ thống cho phép quản lý sách, thành viên và hoạt động mượn trả một cách linh hoạt, bảo mật và tiết kiệm chi phí. Người dùng có thể tra cứu, đăng ký mượn sách, theo dõi lịch sử và cập nhật hồ sơ cá nhân một cách dễ dàng.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                Hệ thống phù hợp với các trường học, thư viện công cộng, tổ chức giáo dục và cá nhân yêu thích đọc sách. Mục tiêu là tạo ra một môi trường học tập và nghiên cứu thuận tiện, thân thiện và hiệu quả.
            </p>
        </div>
    );
};

export default Introduction;