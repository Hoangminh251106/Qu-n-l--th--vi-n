
export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  stock: number;
  borrowed: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  borrowedBooks: number;
  avatarUrl?: string;
  position?: string;
  salary?: number;
}
export interface BorrowRecord {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: string;
  returnDate: string | null;
  status: 'Borrowed' | 'Returned';
}

export interface MonthlyBorrows {
  month: string;
  count: number;
}

export interface MemberGrowth {
  date: string;
  count: number;
}

export interface GenreDistribution {
  genre: string;
  count: number;
}

export interface StockByCategory {
  genre: string;
  stock: number;
}

export interface StatsData {
  monthlyBorrows: MonthlyBorrows[];
  memberGrowth: MemberGrowth[];
  genreDistribution: GenreDistribution[];
  stockByCategory: StockByCategory[];
}
