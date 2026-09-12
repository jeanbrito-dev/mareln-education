'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GremioEstudantil, ItemDados } from '../dados';
import GremioCard from '../components/GremioCard';

interface GremiosClientProps {
  gremiosIniciais: GremioEstudantil[];
  eventos: ItemDados[];
}

const CIDADES = ['Todas', 'Caraguatatuba', 'Ilhabela', 'São Sebastião', 'Ubatuba'] as const;

export default function GremiosClient({ gremiosIniciais, eventos }: GremiosClientProps) {
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('Todas');
  const [busca, setBusca] = useState('');

  // Contagem de eventos por grêmio
  const contagemEventos = useMemo(() => {
    const mapa: Record<string, number> = {};
    for (const evento of eventos) {
      if (evento.gremioId && (evento.status || 'aprovado') === 'aprovado') {
        mapa[evento.gremioId] = (mapa[evento.gremioId] || 0) + 1;
      }
    }
    return mapa;
  }, [eventos]);

  // Filtro dinâmico
  const gremiosFiltrados = useMemo(() => {
    return gremiosIniciais.filter((gremio) => {
      const matchCidade = cidadeSelecionada === 'Todas' || gremio.cidade === cidadeSelecionada;
      const matchBusca =
        busca.trim() === '' ||
        gremio.nome.toLowerCase().includes(busca.toLowerCase().trim()) ||
        gremio.escola.toLowerCase().includes(busca.toLowerCase().trim()) ||
        gremio.cidade.toLowerCase().includes(busca.toLowerCase().trim()) ||
        gremio.descricao.toLowerCase().includes(busca.toLowerCase().trim());

      return matchCidade && matchBusca;
    });
  }, [gremiosIniciais, cidadeSelecionada, busca]);

  return (
    <div className="space-y-10">
      {/* Controles de Filtro e Busca */}
      <div className="bg-white rounded-2xl p-6 border border-[#CFE2F5] shadow-[0_4px_16px_rgba(38,54,74,0.06)] space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Campo de Busca */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718096]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por grêmio, escola ou proposta..."
              className="w-full pl-10 pr-4 py-3 bg-[#F5F9FC] border border-slate-200 rounded-xl text-sm text-[#26364A] placeholder-[#718096] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF] focus:bg-white transition-all"
            />
            {busca && (
              <button
                type="button"
                onClick={() => setBusca('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-semibold text-[#718096] hover:text-[#26364A]"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Botão de Divulgar Evento */}
          <Link
            href="/divulgar-evento"
            className="clay-button font-bold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shrink-0 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Divulgar Ação do Grêmio</span>
          </Link>
        </div>

        {/* Filtro por Cidades */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs font-bold text-[#718096] uppercase tracking-wider shrink-0 mr-1">
            Município:
          </span>
          {CIDADES.map((cidade) => {
            const ativa = cidadeSelecionada === cidade;
            return (
              <button
                key={cidade}
                type="button"
                onClick={() => setCidadeSelecionada(cidade)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  ativa
                    ? 'bg-[#5B8DEF] text-white shadow-xs'
                    : 'bg-[#F5F9FC] text-[#718096] hover:bg-[#EAF4FC] hover:text-[#5B8DEF] border border-slate-200/80'
                }`}
              >
                {cidade}
              </button>
            );
          })}
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#CFE2F5] shadow-[0_2px_8px_rgba(38,54,74,0.04)] text-center">
          <span className="text-2xl font-extrabold text-[#5B8DEF] block">
            {gremiosIniciais.length}
          </span>
          <span className="text-xs font-medium text-[#718096]">Grêmios Cadastrados</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#CFE2F5] shadow-[0_2px_8px_rgba(38,54,74,0.04)] text-center">
          <span className="text-2xl font-extrabold text-[#7C83E8] block">4</span>
          <span className="text-xs font-medium text-[#718096]">Cidades do Litoral</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#CFE2F5] shadow-[0_2px_8px_rgba(38,54,74,0.04)] text-center">
          <span className="text-2xl font-extrabold text-[#5B8DEF] block">
            {gremiosIniciais.reduce((acc, g) => acc + (g.membros || 0), 0)}
          </span>
          <span className="text-xs font-medium text-[#718096]">Estudantes Ativos</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#CFE2F5] shadow-[0_2px_8px_rgba(38,54,74,0.04)] text-center">
          <span className="text-2xl font-extrabold text-[#7C83E8] block">
            {eventos.filter((e) => (e.status || 'aprovado') === 'aprovado').length}
          </span>
          <span className="text-xs font-medium text-[#718096]">Eventos no Portal</span>
        </div>
      </div>

      {/* Grid de Grêmios */}
      {gremiosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gremiosFiltrados.map((gremio) => (
            <GremioCard
              key={gremio.id}
              gremio={gremio}
              totalEventos={contagemEventos[gremio.id] || 0}
            />
          ))}
        </div>
      ) : (
        /* Estado Vazio */
        <div className="bg-white rounded-2xl p-12 text-center border border-[#CFE2F5] shadow-[0_4px_16px_rgba(38,54,74,0.06)] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF4FC] text-[#5B8DEF] flex items-center justify-center mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#26364A]">Nenhum grêmio encontrado</h3>
          <p className="text-sm text-[#718096] max-w-md mx-auto leading-relaxed">
            Não encontramos grêmios correspondentes aos filtros selecionados. Tente buscar por outro termo ou alterar o município.
          </p>
          <button
            type="button"
            onClick={() => {
              setCidadeSelecionada('Todas');
              setBusca('');
            }}
            className="inline-block clay-button font-bold text-xs px-6 py-2.5 rounded-xl transition-all"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
