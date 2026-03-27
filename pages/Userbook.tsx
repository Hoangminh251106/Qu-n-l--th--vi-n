import React from 'react';

const books = [
    {
        id: 1,
        title: 'Dế Mèn Phiêu Lưu Ký',
        author: 'Tô Hoài',
        cover: 'https://via.placeholder.com/120x160?text=Sach+1',
        description: 'Cuộc phiêu lưu kỳ thú của chú dế mèn.',
    },
    {
        id: 2,
        title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
        author: 'Rosie Nguyễn',
        cover: 'https://via.placeholder.com/120x160?text=Sach+2',
        description: 'Lời nhắn gửi đến những người trẻ đang loay hoay.',
    },
    {
        id: 3,
        title: 'Đắc Nhân Tâm',
        author: 'Dale Carnegie',
        cover: 'https://via.placeholder.com/120x160?text=Sach+3',
        description: 'Bí quyết giao tiếp và ứng xử thành công.',
    },
];

const UserBooks: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-6 hidden md:block">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">Thư viện</h2>
                <nav className="space-y-4">
                    <button className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        📚 Danh sách sách
                    </button>
                    <button className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        📖 Sách đã mượn
                    </button>
                    <button className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        👤 Hồ sơ cá nhân
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        📚 Danh sách sách trong thư viện
                    </h1>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                        >
                            <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {book.title}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Tác giả: {book.author}</p>
                                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{book.description}</p>
                                <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    Mượn sách
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default UserBooks;