import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { SearchIcon } from '../components/icons/Icons';
import { Book } from '../types';

const BookCard: React.FC<{ book: Book }> = ({ book }) => (
    <div className="bg-white border border-gray-100 hover:border-blue-400 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
        <img
            src={`https://picsum.photos/seed/${book.id}/400/200`}
            alt={book.title}
            className="w-full h-40 object-cover"
        />
        <div className="p-5">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 truncate">
                {book.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{book.author}</p>
            <div className="mt-3 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span className="bg-blue-50 dark:bg-blue-900 dark:text-blue-200 text-blue-600 px-2 py-1 rounded-full">
                    {book.genre}
                </span>
                <span>{book.year}</span>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                    <span className='text-green-500'>{book.stock}</span> bản có sẵn
                </p>
                <button
                    className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700 transition"
                    onClick={() => console.log(`Mượn sách: ${book.title}`)}
                >
                    Mượn sách
                </button>
            </div>
        </div>
    </div>
);

const Home: React.FC = () => {
    const { books } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = useMemo(() => {
        if (!searchTerm) return books.slice(0, 8); // hiển thị 8 sách đầu nếu chưa tìm
        return books.filter(
            (book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, books]);

    const genres = useMemo(() => {
        const uniqueGenres = Array.from(new Set(books.map(book => book.genre)));
        return uniqueGenres.slice(0, 6); // lấy 6 thể loại đầu
    }, [books]);

    const totalBooks = books.length;
    const totalBorrowed = books.reduce((sum, book) => sum + book.borrowed, 0);
    const totalAvailable = books.reduce((sum, book) => sum + book.stock, 0);

    return (
        <div className="space-y-16">

            {/* Ô tìm kiếm */}
            <section className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    🔍 Tìm kiếm sách yêu thích của bạn
                </h2>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon className="text-gray-400" />
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Nhập tên sách hoặc tác giả..."
                        className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                    />
                </div>
            </section>

            {/* Thống kê thư viện */}
            <section className="max-w-6xl mx-auto px-4 text-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">📚 Tổng số sách</h3>
                        <p className="text-2xl mt-2 font-semibold">{totalBooks}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                        <h3 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Sách còn trong kho</h3>
                        <p className="text-2xl mt-2 font-semibold">{totalAvailable}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                        <h3 className="text-xl font-bold text-red-600 dark:text-red-400">📖 Đang được mượn</h3>
                        <p className="text-2xl mt-2 font-semibold">{totalBorrowed}</p>
                    </div>
                </div>
            </section>

            {/* Thể loại phổ biến */}
            <section className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📂 Khám phá theo thể loại</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {genres.map((genre) => (
                        <span key={genre} className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                            {genre}
                        </span>
                    ))}
                </div>
            </section>

            {/* Danh sách sách */}
            <section className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        🌟 Sách Nổi Bật
                    </h2>
                    <a
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                    >
                        Xem tất cả →
                    </a>
                </div>

                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        Không tìm thấy sách phù hợp với từ khóa.
                    </p>
                )}
            </section>
        </div>
    );
};



export default Home;