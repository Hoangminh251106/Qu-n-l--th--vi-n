import React from 'react';

const UserProfile: React.FC = () => {
    const userName = localStorage.getItem('userName') || 'Thành viên';
    const email = localStorage.getItem('userEmail') || 'user@example.com';

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">👤 Hồ sơ cá nhân</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-md">
                <p className="text-lg text-gray-800 dark:text-white font-semibold">Họ tên: {userName}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Email: {email}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Vai trò: Người dùng thư viện</p>
            </div>
        </div>
    );
};

export default UserProfile;