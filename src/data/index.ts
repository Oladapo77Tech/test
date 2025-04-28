
import { User } from "@/types/table";
import image1 from "../../public/images/Oladapo AYODEJI 1.jpg"

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    role: 'Admin',
    department: 'IT',
    status: 'active',
    profileImage: image1.src
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    username: 'janesmith',
    role: 'Manager',
    department: 'HR',
    status: 'active',
    profileImage: image1.src
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    username: 'bobjohnson',
    role: 'Editor',
    department: 'Marketing',
    status: 'inactive',
    profileImage: image1.src
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    username: 'alicew',
    role: 'User',
    department: 'Finance',
    status: 'new',
    profileImage: image1.src
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    username: 'charlieb',
    role: 'User',
    department: 'Sales',
    status: 'locked',
    profileImage: image1.src
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    username: 'dianap',
    role: 'Admin',
    department: 'IT',
    status: 'active',
    profileImage: image1.src
  },
  {
    id: 7,
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    username: 'ethanh',
    role: 'Manager',
    department: 'Operations',
    status: 'active',
    profileImage: image1.src
  },
  {
    id: 8,
    name: 'Fiona Gallagher',
    email: 'fiona.gallagher@example.com',
    username: 'fionag',
    role: 'Editor',
    department: 'Content',
    status: 'new',
    profileImage: image1.src
  },
];