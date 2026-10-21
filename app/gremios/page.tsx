import { Metadata } from 'next';
import { getGremios, getEventos } from '../lib/db';
import GremiosClient from './GremiosClient';

export const metadata: Metadata = {
  title: 'Grêmios Estudantis do Litoral Norte | MaréLN',
  description:
    'Conheça os grêmios estudantis das escolas públicas e técnicas de São Sebastião, Ilhabela, Caraguatatuba e Ubatuba.',
};

export default async function GremiosPage() {
  const [gremios, eventos] = await Promise.all([
    getGremios(),
    getEventos({ status: 'aprovado' }),
  ]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Cabeçalho da Seção */}
      <div className="space-y-3 border-b border-[#DCEEFF] pb-6">
        <span className="text-xs font-bold text-[#5B8DEF] uppercase tracking-wider">
          Comunidade & Liderança Escolar
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#26364A] tracking-tight">
          Grêmios Estudantis do Litoral Norte
        </h1>
        <p className="text-sm sm:text-base text-[#718096] max-w-3xl leading-relaxed">
          Espaço dedicado à integração e divulgação das lideranças estudantis da rede pública e técnica da nossa região. Conecte-se com seu grêmio e participe das iniciativas escolares.
        </p>
      </div>

      {/* Interface interativa de listagem e filtros */}
      <GremiosClient gremiosIniciais={gremios} eventos={eventos} />
    </div>
  );
}
