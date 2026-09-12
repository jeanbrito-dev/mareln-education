import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../lib/auth';
import { getEventos, getGremios } from '../lib/db';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Painel Administrativo | MaréLN',
  description: 'Gerenciamento de eventos, moderação e grêmios do MaréLN.',
};

export default async function AdminPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const [eventos, gremios] = await Promise.all([
    getEventos({ status: 'todos' }),
    getGremios(),
  ]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <AdminDashboardClient
        eventosIniciais={eventos}
        gremiosIniciais={gremios}
      />
    </div>
  );
}
