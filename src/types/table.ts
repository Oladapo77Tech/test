// types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'locked' | 'new';
  profileImage?: string;
}