import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserSettings from '../components/Usersetting';


const UserHome: React.FC = () => {
    const userName = localStorage.getItem('userName') || 'Thành viên';
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-6 hidden md:block">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">Thư viện</h2>
                <nav className="space-y-4">
                    <button
                        onClick={() => navigate('/books')}
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    >
                        📚 Danh sách sách
                    </button>
                    <button
                        onClick={() => navigate('/borrowreturn')}
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    >
                        📖 Sách đã mượn
                    </button>

                    <button
                        onClick={() => navigate('/profile')}
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    >
                        👤 Hồ sơ cá nhân
                    </button>
                    <button
                        onClick={() => navigate('/activity')}
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    >
                        🧾 Lịch sử hoạt động
                    </button>
                    <button
                        onClick={() => navigate('/book/1')}
                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    >
                        📘 Xem chi tiết sách
                    </button>
                    <button>
                        <div className="flex justify-start p-4">
                            <UserSettings />
                        </div>
                    </button>


                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Phần chào mừng */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h1 className="text-3xl font-bold text-left text-gray-800 dark:text-white">
                            Xin chào, {userName}!
                        </h1>
                        <p className="mt-2 text-left text-gray-600 dark:text-gray-300 text-lg">
                            Chào mừng bạn đến với hệ thống quản lý thư viện. Tại đây bạn có thể:
                        </p>
                        <ul className="mt-4 text-left text-gray-600 dark:text-gray-400 list-disc list-inside space-y-2">
                            <li>Xem và tìm kiếm sách yêu thích</li>
                            <li>Mượn sách trực tuyến dễ dàng</li>
                            <li>Theo dõi lịch sử mượn và trả sách</li>
                            <li>Cập nhật hồ sơ cá nhân</li>
                        </ul>
                    </div>

                    {/* Phần giới thiệu dài */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                            📖 Giới thiệu hệ thống thư viện trực tuyến
                        </h2>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            Chào mừng bạn đến với hệ thống quản lý thư viện trực tuyến – nơi kết nối tri thức, cảm hứng và cộng đồng yêu sách.
                            Đây là nền tảng được thiết kế dành riêng cho bạn, những người yêu thích đọc sách, học hỏi và khám phá thế giới thông qua từng trang giấy.
                        </p>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            Với giao diện thân thiện, hiện đại và dễ sử dụng, bạn có thể dễ dàng tra cứu hàng ngàn đầu sách thuộc nhiều thể loại khác nhau như:
                            văn học cổ điển, tiểu thuyết hiện đại, kỹ năng sống, khoa học – công nghệ, lịch sử, thiếu nhi, và nhiều hơn thế nữa.
                            Mỗi cuốn sách đều được trình bày rõ ràng với thông tin chi tiết về tác giả, năm xuất bản, thể loại và tình trạng sẵn có.
                        </p>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            Hệ thống cho phép bạn mượn sách trực tuyến chỉ với vài cú click, theo dõi lịch sử mượn trả, và nhận thông báo khi đến hạn trả sách.
                            Bạn cũng có thể cập nhật hồ sơ cá nhân, thay đổi thông tin liên hệ, và quản lý tài khoản một cách dễ dàng.
                            Tất cả đều được bảo mật và đồng bộ hóa để đảm bảo trải nghiệm mượt mà và an toàn.
                        </p>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            Ngoài ra, chúng tôi thường xuyên cập nhật danh sách sách nổi bật, sách mới phát hành, và sách được đề xuất theo sở thích của bạn.
                            Bạn sẽ không bỏ lỡ những cuốn sách hay nhất, phù hợp nhất với hành trình học tập và phát triển bản thân của mình.
                        </p>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            Hệ thống thư viện trực tuyến không chỉ là nơi lưu trữ sách, mà còn là không gian kết nối cộng đồng.
                            Bạn có thể chia sẻ đánh giá, bình luận, và trao đổi cảm nhận với những người cùng đam mê.
                            Chúng tôi tin rằng tri thức là sức mạnh, và việc đọc sách là con đường ngắn nhất để mở rộng tầm nhìn và nâng cao giá trị bản thân.
                        </p>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            Hãy bắt đầu hành trình khám phá kho tàng tri thức cùng chúng tôi. Dù bạn là học sinh, sinh viên, nhân viên văn phòng hay người yêu sách tự do,
                            hệ thống thư viện này luôn sẵn sàng đồng hành cùng bạn trên từng bước phát triển.
                        </p>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigate('/books')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                            >
                                Khám phá ngay 📚
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserHome;