import React from 'react';
import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Adminsetting: React.FC = () => {
    const navigate = useNavigate();

    const adminName = 'Minh Hoàng';
    const adminEmail = 'hminh25111@gmail.com';
    const avatarUrl = 'https://i.pravatar.cc/100?u=admin';

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    return (
        <div className="flex justify-end items-start p-4 min-h-[calc(100vh-64px)]">
            <div className="w-80 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                <div className="flex flex-col items-center text-center">
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full border-2 border-blue-500 mb-2"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white -mt-1">{adminName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{adminEmail}</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 px-4 py-2 rounded-full flex items-center justify-center gap-2 transition"
                >
                    <LogOutIcon className="w-4 h-4" />
                    Đăng xuất
                </button>

                <div className="text-sm text-gray-500 dark:text-gray-400 space-x-4 text-center pt-2">
                    <Link to="/privacy-policy" className="hover:underline">Chính sách bảo mật</Link>
                    <Link to="/terms-of-service" className="hover:underline">Điều khoản dịch vụ</Link>
                </div>
            </div>
        </div>
    );
};

export default Adminsetting;