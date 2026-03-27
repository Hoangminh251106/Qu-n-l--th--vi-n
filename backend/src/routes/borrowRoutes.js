// backend/src/controllers/borrowController.js

exports.borrowBook = async (req, res) => {
    const { bookId, loanDays = 7 } = req.body;
    
    // 1. LẤY ID TỪ TOKEN (req.user do middleware Auth cung cấp)
    // Thay vì lấy memberId từ req.body, ta lấy từ req.user.id
    const memberId = req.user?.id; 
  
    if (!memberId) {
      return res.status(401).json({ message: "Bạn cần đăng nhập để mượn sách" });
    }
  
    // 2. LOGIC NGHIỆP VỤ THỰC TẾ
    // - Kiểm tra sách có tồn tại không?
    // - Kiểm tra available_quantity > 0 không?
    // - Nếu OK -> Tạo bản ghi trong bảng 'loans' (hoặc borrow_history)
    // - Trừ available_quantity đi 1
    
    // (Đoạn này bạn giữ nguyên code SQL của bạn, chỉ cần thay đổi biến memberId thôi)
    
    // staffId có thể để NULL hoặc ID của Admin mặc định nếu mượn online
    const staffId = null; 
  
    // ... (Code xử lý Database của bạn ở đây) ...
    
    res.status(201).json({
      success: true,
      message: "Mượn sách thành công! Hạn trả là " + loanDays + " ngày tới.",
      data: { bookId, memberId, loanDays }
    });
  };