export type Role = "Admin" | "Member";

export type JwtPayload = {
  userId: number;
  role: Role;
  memberId: number | null;
  fullName?: string;
  email?: string;
  exp: number;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  category_id: number | null;
  categoryName: string | null;
  isbn: string | null;
  publisher: string | null;
  publish_year: number | null;
  totalQuantity: number | null;
  availableQuantity: number | null;
  price: string | null;
  location: string | null;
  status: string | null;
  coverUrl?: string | null;
};

export type LoanRow = {
  id: number;
  bookId: number;
  bookTitle: string;
  memberId: number;
  memberName: string;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  fineAmount: string | number | null;
  status: string;
};

