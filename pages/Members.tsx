
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Member } from '../types';
import Modal from '../components/Modal';
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon } from '../components/icons/Icons';


const MemberForm: React.FC<{ member?: Member; onSave: (member: Member | Omit<Member, 'id'>) => void; onClose: () => void }> = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    email: member?.email || '',
    joinDate: member?.joinDate || new Date().toISOString().split('T')[0],
    borrowedBooks: member?.borrowedBooks || 0,
    avatarUrl: member?.avatarUrl || '',
    position: member?.position || '',
    salary: member?.salary || 0,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'borrowedBooks' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (member) {
      onSave({ ...member, ...formData });
    } else {
      onSave(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div>
        <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Join Date</label>
        <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div>
        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Avatar URL</label>
        <input type="url" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
        <input type="text" name="position" value={formData.position} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Salary</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-500">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Save</button>
      </div>
    </form>
  );
};

const Members: React.FC = () => {
  const { members, addMember, updateMember, deleteMember } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = useMemo(() => {
    return members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm]);

  const handleAddNew = () => {
    setEditingMember(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      deleteMember(id);
    }
  };

  const handleSave = (memberData: Member | Omit<Member, 'id'>) => {
    if ('id' in memberData) {
      updateMember(memberData);
    } else {
      addMember(memberData);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Members</h1>
        <button onClick={handleAddNew} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          <PlusIcon className="mr-2" />
          Add New Member
        </button>
      </div>

      <div className="mb-6 relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {['Avatar', 'Name', 'Email', 'Join Date', 'Position', 'Salary', 'Books Borrowed', 'Actions'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMembers.map(member => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {member.avatarUrl ? (
                    <img src={member.avatarUrl} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{member.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{member.position || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {member.salary ? `$${member.salary.toLocaleString()}` : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{member.borrowedBooks}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => handleEdit(member)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1"><PencilIcon /></button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"><TrashIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMember ? 'Edit Member' : 'Add New Member'}>
        <MemberForm member={editingMember} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Members;

