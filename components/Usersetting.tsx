import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSettings: React.FC = () => {
    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userActivity');
        localStorage.removeItem('userCart');
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <button
                onClick={() => setConfirm(true)}
                className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
                ⚙️ Cài đặt
            </button>


            {confirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                        <p className="text-lg text-gray-800 dark:text-white mb-4">Bạn có chắc muốn đăng xuất không?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Có, đăng xuất
                            </button>
                            <button
                                onClick={() => setConfirm(false)}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-400"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserSettings;