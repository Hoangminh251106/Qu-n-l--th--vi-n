
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { BorrowRecord } from '../types';
import Modal from '../components/Modal';
import { PlusIcon, PencilIcon } from '../components/icons/Icons';

const BorrowReturnForm: React.FC<{ record?: BorrowRecord; onSave: (record: BorrowRecord | Omit<BorrowRecord, 'id'>) => void; onClose: () => void }> = ({ record, onSave, onClose }) => {
  const { books, members } = useData();
  const [formData, setFormData] = useState({
    bookId: record?.bookId || '',
    memberId: record?.memberId || '',
    borrowDate: record?.borrowDate || new Date().toISOString().split('T')[0],
    returnDate: record?.returnDate || null,
    status: record?.status || 'Borrowed',
  });

  const availableBooks = useMemo(() => books.filter(b => b.stock > 0), [books]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === '' && name === 'returnDate' ? null : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(record) {
      onSave({ ...record, ...formData });
    } else {
      onSave({ ...formData, returnDate: null, status: 'Borrowed' });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Member</label>
        <select name="memberId" value={formData.memberId} onChange={handleChange} required disabled={!!record} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-600">
          <option value="">Select a member</option>
          {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>
       <div>
        <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Book</label>
        <select name="bookId" value={formData.bookId} onChange={handleChange} required disabled={!!record} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-600">
          <option value="">Select a book</option>
          {availableBooks.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Borrow Date</label>
        <input type="date" name="borrowDate" value={formData.borrowDate} onChange={handleChange} required disabled={!!record} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-600" />
      </div>
      {record && (
          <>
            <div>
              <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Return Date</label>
              <input type="date" name="returnDate" value={formData.returnDate || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600">
                <option value="Borrowed">Borrowed</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
          </>
      )}
      <div className="flex justify-end space-x-2 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-500">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Save</button>
      </div>
    </form>
  );
};


const BorrowReturn: React.FC = () => {
    const { books, members, borrowRecords, addBorrowRecord, updateBorrowRecord } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<BorrowRecord | undefined>(undefined);

    const enrichedRecords = useMemo(() => {
        return borrowRecords.map(record => {
            const book = books.find(b => b.id === record.bookId);
            const member = members.find(m => m.id === record.memberId);
            return {
                ...record,
                bookTitle: book?.title || 'Unknown Book',
                memberName: member?.name || 'Unknown Member'
            };
        }).sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime());
    }, [borrowRecords, books, members]);

    const handleAddNew = () => {
        setEditingRecord(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (record: BorrowRecord) => {
        setEditingRecord(record);
        setIsModalOpen(true);
    };

    const handleSave = (recordData: BorrowRecord | Omit<BorrowRecord, 'id'>) => {
        if ('id' in recordData) {
            updateBorrowRecord(recordData);
        } else {
            addBorrowRecord(recordData as Omit<BorrowRecord, 'id'>);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Borrowing Records</h1>
                <button onClick={handleAddNew} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                    <PlusIcon className="mr-2" />
                    New Borrow Record
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {['Book Title', 'Member Name', 'Borrow Date', 'Return Date', 'Status', 'Actions'].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {enrichedRecords.map(record => (
                            <tr key={record.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{record.bookTitle}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{record.memberName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{record.borrowDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{record.returnDate || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'Borrowed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'}`}>
                                        {record.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => handleEdit(record)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1"><PencilIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingRecord ? 'Update Record' : 'New Borrow Record'}>
                <BorrowReturnForm record={editingRecord} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default BorrowReturn;
