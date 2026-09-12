import { Metadata } from 'next';
import { getGremios } from '../lib/db';
import DivulgarEventoClient from './DivulgarEventoClient';

export const metadata: Metadata = {
  title: 'Divulgar Evento Escolar ou Comunitário | MaréLN',
  description:
    'Cadastre o evento da sua escola, clube, torneio de e-sports ou ação comunitária para divulgação no portal MaréLN.',
};

interface DivulgarEventoPageProps {
  searchParams: Promise<{ gremio?: string }>;
}

export default async function DivulgarEventoPage({ searchParams }: DivulgarEventoPageProps) {
  const params = await searchParams;
  const gremios = await getGremios();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Cabeçalho da Página */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          Divulgação Aberta
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Divulgue seu Evento no MaréLN
        </h1>
        <p className="text-sm sm:text-base text-gray leading-relaxed">
          Tem um campeonato, feira, sarau, mutirão ambiental ou atividade escolar no Litoral Norte? Preencha as informações abaixo para submeter seu evento à nossa redação.
        </p>
      </div>

      {/* Explicação do Fluxo de Moderação */}
      <div className="bg-white rounded-2xl p-6 border border-light-blue shadow-xs">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
          Como funciona o processo de publicação:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray">
          <div className="p-3.5 rounded-xl bg-background border border-light-blue/50 space-y-1">
            <span className="font-bold text-primary block">1. Preenchimento</span>
            <span>Preencha o formulário com dados completos e verídicos do seu evento.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-soft-blue border border-light-blue/50 space-y-1">
            <span className="font-bold text-secondary block">2. Moderação</span>
            <span>Nossa equipe revisa a proposta para garantir conformidade e qualidade.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-soft-purple border border-light-blue/50 space-y-1">
            <span className="font-bold text-primary block">3. Publicação</span>
            <span>Após aprovado, o evento entra no ar e pode ser descoberto e favoritado por todos!</span>
          </div>
        </div>
      </div>

      {/* Formulário Interativo */}
      <DivulgarEventoClient
        gremios={gremios}
        gremioSelecionadoInicial={params.gremio || ''}
      />
    </div>
  );
}