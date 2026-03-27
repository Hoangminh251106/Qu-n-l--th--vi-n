import React, { useEffect, useState } from 'react';

const UserActivity: React.FC = () => {
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('userActivity') || '[]');
        setHistory(stored);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🧾 Lịch sử hoạt động</h1>
            {history.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">Bạn chưa có hoạt động nào.</p>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-gray-700 dark:text-gray-300">Hành động</th>
                                <th className="py-2 text-gray-700 dark:text-gray-300">Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className="py-2 text-gray-800 dark:text-white">{item.action}</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-400">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserActivity;