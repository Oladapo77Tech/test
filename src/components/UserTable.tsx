"use client"
import { User } from '@/types';
import { useState } from 'react';

export default function UserTable({ users }: { users: User[] }) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);


  const handleUserSelect = (userId: number): void => {
    // Check if user exist in selected users, remove from selectedusers
    if(selectedUsers.includes(userId)){
      setSelectedUsers(selectedUsers.filter((id:number): boolean => id !== userId));
      setSelectAll(false)
    } else{
      setSelectedUsers([...selectedUsers, userId]);
      if(selectedUsers.length + 1  === users.length){
        setSelectAll(true)
      }
    }
  }

  // Handle select all checkbox
  const handleSelectAll = () => {
    // If all users are selected, unselect all
    if (selectAll) {
      setSelectedUsers([]);
      setSelectAll(false);
    } else {
      setSelectedUsers(users.map((user) => user.id));
      setSelectAll(true);
    }
  };

  // You can use this function to perform actions on selected users
  const handleActionOnSelected = () => {
    console.log('Selected users:', selectedUsers);
    // Implement your action here
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">User List</h2>
        {selectedUsers.length > 0 && (
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleActionOnSelected}
          > Action on Selected ({selectedUsers.length})
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
              </th>
              <th className="p-3 text-left border-b">ID</th>
              <th className="p-3 text-left border-b">Name</th>
              <th className="p-3 text-left border-b">Email</th>
              <th className="p-3 text-left border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id} 
                className={`border-b hover:bg-gray-50 ${
                  selectedUsers.includes(user.id) ? 'bg-blue-50' : ''
                }`}
              >
                <td className="p-3">
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}