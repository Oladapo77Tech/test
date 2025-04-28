"use client"
import { useState, useEffect } from 'react';
import { Search, Filter, Download, MoreVertical, Edit, Trash2, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { User } from '@/types/table';

interface SortConfig {
  // We can also use index signature
  key: keyof User | null;
  direction: 'asc' | 'desc';
}

interface FilterConfig {
  status: string;
  role: string;
  department: string;
}

export default function UserTable({ users }: { users: User[] }) {
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterConfig>({ status: '', role: '', department: '' });
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique values for filters
  const uniqueRoles = Array.from(new Set(users.map(user => user.role)));
  const uniqueDepartments = Array.from(new Set(users.map(user => user.department)));
  const statusOptions = ['active', 'inactive', 'locked', 'new'];

  // Handle user selection
  const handleUserSelect = (userId: number): void => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id: number): boolean => id !== userId));
      setSelectAll(false);
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
      if (selectedUserIds.length + 1 === filteredUsers.length) {
        setSelectAll(true);
      }
    }
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUserIds([]);
      setSelectAll(false);
    } else {
      setSelectedUserIds(filteredUsers.map((user) => user.id));
      setSelectAll(true);
    }
  };

  // Handle sorting
  const requestSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...users];

    // Apply search
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        (user.username && user.username.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    // Apply filters
    if (filters.status) {
      result = result.filter(user => user.status === filters.status);
    }
    if (filters.role) {
      result = result.filter(user => user.role === filters.role);
    }
    if (filters.department) {
      result = result.filter(user => user.department === filters.department);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if ((a[sortConfig.key!] as string) < (b[sortConfig.key!] as string)) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if ((a[sortConfig.key!] as string) > (b[sortConfig.key!] as string)) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredUsers(result);
    
    // Reset selection when filters change
    setSelectedUserIds([]);
    setSelectAll(false);
  }, [searchTerm, filters, sortConfig, users]);

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({ status: '', role: '', department: '' });
    setSortConfig({ key: null, direction: 'asc' });
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Department', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => 
        [user.id, user.name, user.email, user.role, user.department, user.status].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      locked: 'bg-red-100 text-red-800',
      new: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status}
      </span>
    );
  };

  // Actions on selected users
  const handleActionOnSelected = (action: 'enable' | 'disable' | 'delete') => {
    console.log(`${action} users:`, selectedUserIds);
    // Implement your action here
    alert(`${action} action triggered for ${selectedUserIds.length} users`);
  };

  // Handle row click for user details
  const handleRowClick = (userId: number) => {
    console.log('Navigate to user details:', userId);
    // Navigate to user details page
    // Example: router.push(`/users/${userId}`);
  };

  return (
    <div className="bg-red-50 rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">User Management</h2>
          <div className="flex items-center gap-2">
            {selectedUserIds.length > 0 && (
              <div className="flex items-center gap-2">
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleActionOnSelected('enable')}
                > Enable
                </button>
                <button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleActionOnSelected('disable')}
                > Disable
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleActionOnSelected('delete')}
                > Delete
                </button>
              </div>
            )}
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
              onClick={exportToCSV}
            > <Download size={16} />  Export
            </button>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
            > <UserPlus size={16} /> Add New User
            </button>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search by name, email or username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter toggle */}
          <div className="flex gap-2">
            <button 
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 text-sm hover:bg-gray-50"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} />
              Filters
            </button>
            
            {Object.values(filters).some(val => val !== '') && (
              <button 
                className="flex items-center gap-2 bg-blue-50 border border-blue-300 text-blue-700 rounded-lg px-4 py-2.5 text-sm hover:bg-blue-100"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        {/* Expanded filters */}
        {isFilterOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
            
            {/* Role filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
              >
                <option value="">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            {/* Department filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className=''>
                <input 
                  type="checkbox" 
                  checked={selectAll} 
                  onChange={handleSelectAll} 
                  className="w-4 h-4 text-blue-600 bg-gray-10 border-gray-300 rounded focus:ring-blue-500 bg-green-500" 
                />
              </th>
              <th 
                onClick={() => requestSort('id')} 
                className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    ID 
                    {sortConfig.key === 'id' && ( <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span> )}
                  </div>
              </th>
              <th 
                onClick={() => requestSort('name')}
                className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  User 
                  { sortConfig.key === 'name' && ( <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span> )}
                </div>
              </th>
              <th 
                className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('email')}
              >
                <div className="flex items-center gap-1">
                  Email 
                  {sortConfig.key === 'email' && ( <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span> )}
                </div>
              </th>
              <th 
                className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('role')}
              >
                <div className="flex items-center gap-1">
                  Role 
                  {sortConfig.key === 'role' && ( <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span> )}
                </div>
              </th>
              <th 
                className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('department')}
              >
                <div className="flex items-center gap-1">
                  Department 
                  {sortConfig.key === 'department' && ( <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span> )}
                </div>
              </th>
              <th 
                className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status 
                  {sortConfig.key === 'status' && ( <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span> )}
                </div>
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className={`hover:bg-gray-50 ${ selectedUserIds.includes(user.id) ? 'bg-blue-50' : '' }`}
                >
                  <td className="p-3 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={selectedUserIds.includes(user.id)}
                      onChange={() => handleUserSelect(user.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap" onClick={() => handleRowClick(user.id)}>
                    <div className="text-sm text-gray-900">{user.id}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap" onClick={() => handleRowClick(user.id)}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        {user.profileImage ? (
                          <Image 
                            src={user.profileImage} 
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {user.status === 'new' && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        {user.username && (
                          <div className="text-sm text-gray-500">@{user.username}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 whitespace-nowrap" onClick={() => handleRowClick(user.id)}>
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap" onClick={() => handleRowClick(user.id)}>
                    <div className="text-sm text-gray-900">{user.role}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap" onClick={() => handleRowClick(user.id)}>
                    <div className="text-sm text-gray-900">{user.department}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap" onClick={() => handleRowClick(user.id)}>
                    {renderStatusBadge(user.status)}
                  </td>
                  <td className="p-3 whitespace-nowrap text-right">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900" 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit user:', user.id);
                        }}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900" 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Delete user:', user.id);
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  No users found matching your search or filter criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination - Basic implementation */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
              <span className="font-medium">{filteredUsers.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}