import { useEffect } from 'react';
import { useStore } from './store/useStore';
import LoginPage from './components/LoginPage';
import UserForm from './components/user/UserForm';
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  const { session, loadSession } = useStore();

  useEffect(() => {
    loadSession();
  }, []);

  if (!session) {
    return <LoginPage />;
  }

  if (session.role === 'admin') {
    return <AdminDashboard />;
  }

  if (session.role === 'user') {
    return <UserForm />;
  }

  return <LoginPage />;
}
