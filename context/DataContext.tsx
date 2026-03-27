import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, Member, BorrowRecord, StatsData } from '../types';

interface DataContextType {
  books: Book[];
  members: Member[];
  borrowRecords: BorrowRecord[];
  stats: StatsData;
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (member: Member) => void;
  deleteMember: (id: string) => void;
  addBorrowRecord: (record: Omit<BorrowRecord, 'id'>) => void;
  updateBorrowRecord: (record: BorrowRecord) => void;
  deleteBorrowRecord: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const emptyStats: StatsData = {
    monthlyBorrows: [],
    memberGrowth: [],
    genreDistribution: [],
    stockByCategory: [],
};


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([]);
  const [stats, setStats] = useState<StatsData>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, membersRes, borrowRes, statsRes] = await Promise.all([
          fetch('./data/books.json'),
          fetch('./data/members.json'),
          fetch('./data/borrow.json'),
          fetch('./data/stats.json'),
        ]);

        if (!booksRes.ok || !membersRes.ok || !borrowRes.ok || !statsRes.ok) {
            throw new Error('Network response was not ok');
        }

        const booksData = await booksRes.json();
        const membersData = await membersRes.json();
        const borrowData = await borrowRes.json();
        const statsData = await statsRes.json();

        setBooks(booksData);
        setMembers(membersData);
        setBorrowRecords(borrowData);
        setStats(statsData);
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Book CRUD
  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now().toString() };
    setBooks(prev => [...prev, newBook]);
  };
  const updateBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(book => book.id === updatedBook.id ? updatedBook : book));
  };
  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  // Member CRUD
  const addMember = (member: Omit<Member, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setMembers(prev => [...prev, newMember]);
  };
  const updateMember = (updatedMember: Member) => {
    setMembers(prev => prev.map(member => member.id === updatedMember.id ? updatedMember : member));
  };
  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

     

  
  

  // Borrow Record CRUD
  const addBorrowRecord = (record: Omit<BorrowRecord, 'id'>) => {
    const newRecord = { ...record, id: Date.now().toString() };
    setBorrowRecords(prev => [...prev, newRecord]);
    // Update book stock and member borrowed count
    setBooks(prev => prev.map(b => b.id === record.bookId ? {...b, stock: b.stock - 1, borrowed: b.borrowed + 1} : b));
    setMembers(prev => prev.map(m => m.id === record.memberId ? {...m, borrowedBooks: m.borrowedBooks + 1} : m));
  };
  const updateBorrowRecord = (updatedRecord: BorrowRecord) => {
    const oldRecord = borrowRecords.find(r => r.id === updatedRecord.id);
    setBorrowRecords(prev => prev.map(record => record.id === updatedRecord.id ? updatedRecord : record));
    // If status changed to Returned, update book stock and member count
    if (oldRecord?.status === 'Borrowed' && updatedRecord.status === 'Returned') {
        setBooks(prev => prev.map(b => b.id === updatedRecord.bookId ? {...b, stock: b.stock + 1, borrowed: b.borrowed - 1} : b));
        setMembers(prev => prev.map(m => m.id === updatedRecord.memberId ? {...m, borrowedBooks: m.borrowedBooks - 1} : m));
    }
  };
  const deleteBorrowRecord = (id: string) => {
    setBorrowRecords(prev => prev.filter(record => record.id !== id));
  };
  
  if (loading) {
      return <div className="flex h-screen w-full items-center justify-center text-lg dark:bg-gray-900 dark:text-gray-200">Loading Library Data...</div>;
  }
  
  if (error) {
      return <div className="flex h-screen w-full items-center justify-center text-lg text-red-500 dark:bg-gray-900">Error loading data: {error}</div>;
  }

  return (
    <DataContext.Provider value={{
      books, members, borrowRecords, stats,
      addBook, updateBook, deleteBook,
      addMember, updateMember, deleteMember,
      addBorrowRecord, updateBorrowRecord, deleteBorrowRecord
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};