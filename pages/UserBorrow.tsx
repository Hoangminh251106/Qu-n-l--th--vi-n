import React from 'react';

const borrowedBooks = [
    {
        id: 1,
        title: 'Dế Mèn Phiêu Lưu Ký',
        author: 'Tô Hoài',
        borrowedDate: '2025-11-01',
        returnDate: '2025-11-15',
    },
    {
        id: 2,
        title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
        author: 'Rosie Nguyễn',
        borrowedDate: '2025-10-20',
        returnDate: '2025-11-05',
    },
];

const UserBorrowed: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📖 Sách đã mượn</h1>
            <div className="space-y-4">
                {borrowedBooks.map((book) => (
                    <div key={book.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{book.title}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Tác giả: {book.author}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Ngày mượn: {book.borrowedDate} | Ngày trả: {book.returnDate}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBorrowed;