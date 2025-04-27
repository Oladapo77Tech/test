// export const users: User[]  = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
//   { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
// ];

import { User } from "@/types/table";

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    role: 'Admin',
    department: 'IT',
    status: 'active',
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    username: 'janesmith',
    role: 'Manager',
    department: 'HR',
    status: 'active',
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    username: 'bobjohnson',
    role: 'Editor',
    department: 'Marketing',
    status: 'inactive',
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    username: 'alicew',
    role: 'User',
    department: 'Finance',
    status: 'new',
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    username: 'charlieb',
    role: 'User',
    department: 'Sales',
    status: 'locked',
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    username: 'dianap',
    role: 'Admin',
    department: 'IT',
    status: 'active',
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: 7,
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    username: 'ethanh',
    role: 'Manager',
    department: 'Operations',
    status: 'active',
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: 8,
    name: 'Fiona Gallagher',
    email: 'fiona.gallagher@example.com',
    username: 'fionag',
    role: 'Editor',
    department: 'Content',
    status: 'new',
    profileImage: '/api/placeholder/40/40'
  },
];