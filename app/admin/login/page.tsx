import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../../lib/auth';
import AdminLoginClient from './AdminLoginClient';

export const metadata: Metadata = {
  title: 'Login Administrativo | MaréLN',
  description: 'Área restrita aos administradores e moderadores do MaréLN.',
};

export default async function AdminLoginPage() {
  const isAuth = await isAdminAuthenticated();
  if (isAuth) {
    redirect('/admin');
  }

  return <AdminLoginClient />;
}
