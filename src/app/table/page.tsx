import { users } from '@/data';
import UserTable from '../../components/UserTable';
export default function page() {


  return (
    <div className="container mx-auto px-4 py-8">
      <UserTable users={ users } />
    </div>
  );
}