import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState<any>(null);
    const [borrowDate, setBorrowDate] = useState('');
    const [error, setError] = useState('');

    // Giả lập gọi API lấy sách từ admin
    useEffect(() => {
        const adminBooks = JSON.parse(localStorage.getItem('adminBooks') || '[]');
        const foundBook = adminBooks.find((b: any) => b.id === id);
        setBook(foundBook);
    }, [id]);

    const handleBorrow = () => {
        if (!borrowDate) {
            setError('Vui lòng chọn ngày mượn');
            return;
        }

        // Lưu vào lịch sử người dùng
        const history = JSON.parse(localStorage.getItem('userActivity') || '[]');
        const newEntry = {
            action: `Đặt sách "${book.title}"`,
            date: borrowDate,
        };
        localStorage.setItem('userActivity', JSON.stringify([...history, newEntry]));

        // Lưu vào danh sách mượn bên admin
        const borrowed = JSON.parse(localStorage.getItem('adminBorrowed') || '[]');
        const newBorrow = {
            bookId: book.id,
            title: book.title,
            user: localStorage.getItem('userName') || 'Thành viên',
            date: borrowDate,
        };
        localStorage.setItem('adminBorrowed', JSON.stringify([...borrowed, newBorrow]));

        alert('✅ Đặt sách thành công!');
        navigate('/activity');
    };

    if (!book) return <div className="p-6">Không tìm thấy sách</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{book.title}</h1>
                <p className="text-gray-600 dark:text-gray-300">Tác giả: {book.author}</p>
                <p className="text-gray-600 dark:text-gray-300">Thể loại: {book.genre}</p>
                <p className="text-gray-600 dark:text-gray-300">Năm xuất bản: {book.year}</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{book.description}</p>

                <div className="mt-6">
                    <label className="block text-gray-800 dark:text-white font-semibold mb-2">📅 Chọn ngày mượn</label>
                    <input
                        type="date"
                        value={borrowDate}
                        onChange={(e) => setBorrowDate(e.target.value)}
                        className="px-4 py-2 border rounded w-full"
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button
                        onClick={handleBorrow}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Đặt sách
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;