'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ItemDados, GremioEstudantil, CidadeLitoralNorte } from '../dados';
import {
  adminLogoutAction,
  aprovarEventoAction,
  rejeitarEventoAction,
  excluirEventoAction,
  salvarEventoAdminAction,
  salvarGremioAction,
  excluirGremioAction,
} from '../lib/actions';
import ModalConfirmacao from '../components/ModalConfirmacao';

interface AdminDashboardClientProps {
  eventosIniciais: ItemDados[];
  gremiosIniciais: GremioEstudantil[];
}

type AbaAdmin = 'pendentes' | 'eventos' | 'gremios';

const CIDADES: CidadeLitoralNorte[] = [
  'Caraguatatuba',
  'Ilhabela',
  'São Sebastião',
  'Ubatuba',
];

const CATEGORIAS = [
  'E-Sports',
  'Tecnologia',
  'Cultura',
  'Sustentabilidade',
  'Esportes',
  'Grêmio',
  'Educação',
  'Feiras & Oficinas',
  'Música & Arte',
];

export default function AdminDashboardClient({
  eventosIniciais,
  gremiosIniciais,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [abaAtiva, setAbaAtiva] = useState<AbaAdmin>('pendentes');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [buscaEvento, setBuscaEvento] = useState('');
  const [buscaGremio, setBuscaGremio] = useState('');
  const [feedback, setFeedback] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  // Estados de Modais
  const [modalExcluirEvento, setModalExcluirEvento] = useState<{ isOpen: boolean; id: string; titulo: string }>({
    isOpen: false,
    id: '',
    titulo: '',
  });

  const [modalRejeitarEvento, setModalRejeitarEvento] = useState<{ isOpen: boolean; id: string; titulo: string }>({
    isOpen: false,
    id: '',
    titulo: '',
  });

  const [modalExcluirGremio, setModalExcluirGremio] = useState<{ isOpen: boolean; id: string; nome: string }>({
    isOpen: false,
    id: '',
    nome: '',
  });

  // Modal de Edição/Criação de Evento
  const [eventoEditando, setEventoEditando] = useState<ItemDados | null>(null);
  const [modalEventoAberto, setModalEventoAberto] = useState(false);

  // Modal de Edição/Criação de Grêmio
  const [gremioEditando, setGremioEditando] = useState<GremioEstudantil | null>(null);
  const [modalGremioAberto, setModalGremioAberto] = useState(false);

  const eventosPendentes = eventosIniciais.filter(
    (e) => (e.status || 'aprovado') === 'pendente'
  );

  const eventosFiltrados = eventosIniciais.filter((e) => {
    const statusAtual = e.status || 'aprovado';
    const matchStatus = filtroStatus === 'todos' || statusAtual === filtroStatus;
    const matchBusca =
      buscaEvento.trim() === '' ||
      e.titulo.toLowerCase().includes(buscaEvento.toLowerCase().trim()) ||
      (e.autor && e.autor.toLowerCase().includes(buscaEvento.toLowerCase().trim())) ||
      (e.cidade && e.cidade.toLowerCase().includes(buscaEvento.toLowerCase().trim()));

    return matchStatus && matchBusca;
  });

  const gremiosFiltrados = gremiosIniciais.filter((g) => {
    return (
      buscaGremio.trim() === '' ||
      g.nome.toLowerCase().includes(buscaGremio.toLowerCase().trim()) ||
      g.escola.toLowerCase().includes(buscaGremio.toLowerCase().trim()) ||
      g.cidade.toLowerCase().includes(buscaGremio.toLowerCase().trim())
    );
  });

  const mostrarMensagem = (tipo: 'sucesso' | 'erro', texto: string) => {
    setFeedback({ tipo, texto });
    setTimeout(() => {
      setFeedback(null);
    }, 5000);
  };

  const handleLogout = () => {
    startTransition(async () => {
      await adminLogoutAction();
      router.push('/admin/login');
      router.refresh();
    });
  };

  const handleAprovar = (id: string, titulo: string) => {
    startTransition(async () => {
      const res = await aprovarEventoAction(id);
      if (res.success) {
        mostrarMensagem('sucesso', `Evento "${titulo}" aprovado com sucesso.`);
        router.refresh();
      } else {
        mostrarMensagem('erro', res.error || 'Erro ao aprovar evento.');
      }
    });
  };

  const handleConfirmarRejeitar = () => {
    const { id, titulo } = modalRejeitarEvento;
    startTransition(async () => {
      const res = await rejeitarEventoAction(id);
      if (res.success) {
        mostrarMensagem('sucesso', `Evento "${titulo}" rejeitado.`);
        setModalRejeitarEvento({ isOpen: false, id: '', titulo: '' });
        router.refresh();
      } else {
        mostrarMensagem('erro', res.error || 'Erro ao rejeitar evento.');
      }
    });
  };

  const handleConfirmarExcluirEvento = () => {
    const { id, titulo } = modalExcluirEvento;
    startTransition(async () => {
      const res = await excluirEventoAction(id);
      if (res.success) {
        mostrarMensagem('sucesso', `Evento "${titulo}" removido com sucesso.`);
        setModalExcluirEvento({ isOpen: false, id: '', titulo: '' });
        router.refresh();
      } else {
        mostrarMensagem('erro', res.error || 'Erro ao excluir evento.');
      }
    });
  };

  const handleConfirmarExcluirGremio = () => {
    const { id, nome } = modalExcluirGremio;
    startTransition(async () => {
      const res = await excluirGremioAction(id);
      if (res.success) {
        mostrarMensagem('sucesso', `Grêmio "${nome}" excluído com sucesso.`);
        setModalExcluirGremio({ isOpen: false, id: '', nome: '' });
        router.refresh();
      } else {
        mostrarMensagem('erro', res.error || 'Erro ao excluir grêmio.');
      }
    });
  };

  const handleSalvarEvento = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await salvarEventoAdminAction(formData);
      if (res.success) {
        mostrarMensagem('sucesso', 'Evento salvo com sucesso!');
        setModalEventoAberto(false);
        setEventoEditando(null);
        router.refresh();
      } else {
        mostrarMensagem('erro', res.error || 'Erro ao salvar evento.');
      }
    });
  };

  const handleSalvarGremio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await salvarGremioAction(formData);
      if (res.success) {
        mostrarMensagem('sucesso', 'Grêmio salvo com sucesso!');
        setModalGremioAberto(false);
        setGremioEditando(null);
        router.refresh();
      } else {
        mostrarMensagem('erro', res.error || 'Erro ao salvar grêmio.');
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Barra Superior do Administrador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#CFE2F5] shadow-[0_4px_16px_rgba(38,54,74,0.06)]">
        <div>
          <span className="text-xs font-bold text-[#5B8DEF] uppercase tracking-wider block">
            Gestão & Moderação
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26364A] tracking-tight">
            Painel Administrativo
          </h1>
          <p className="text-xs text-[#718096] mt-0.5">
            MaréLN — Portal de Eventos do Litoral Norte
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl border border-[#CFE2F5] bg-[#F5F9FC] hover:bg-[#EAF4FC] text-[#26364A] font-semibold text-xs transition-colors"
          >
            Ver Portal
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition-colors disabled:opacity-50"
          >
            Sair do Painel
          </button>
        </div>
      </div>

      {/* Feedback contextual */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-sm font-semibold flex items-center justify-between shadow-xs transition-all ${
            feedback.tipo === 'sucesso'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
          role="status"
        >
          <span>{feedback.texto}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs opacity-75 hover:opacity-100 ml-4 font-bold"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Navegação por Abas Funcionais */}
      <div className="flex items-center gap-2 border-b border-[#CFE2F5] pb-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setAbaAtiva('pendentes')}
          className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shrink-0 ${
            abaAtiva === 'pendentes'
              ? 'bg-[#5B8DEF] text-white shadow-xs'
              : 'text-[#718096] hover:bg-white hover:text-[#26364A]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Pendentes para Análise</span>
          {eventosPendentes.length > 0 && (
            <span className="bg-amber-400 text-amber-950 text-xs px-2 py-0.5 rounded-full font-extrabold">
              {eventosPendentes.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setAbaAtiva('eventos')}
          className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shrink-0 ${
            abaAtiva === 'eventos'
              ? 'bg-[#5B8DEF] text-white shadow-xs'
              : 'text-[#718096] hover:bg-white hover:text-[#26364A]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>Todos os Eventos</span>
          <span className="text-xs opacity-80">({eventosIniciais.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAbaAtiva('gremios')}
          className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shrink-0 ${
            abaAtiva === 'gremios'
              ? 'bg-[#5B8DEF] text-white shadow-xs'
              : 'text-[#718096] hover:bg-white hover:text-[#26364A]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>Gerenciar Grêmios</span>
          <span className="text-xs opacity-80">({gremiosIniciais.length})</span>
        </button>
      </div>

      {/* ABA 1: EVENTOS PENDENTES */}
      {abaAtiva === 'pendentes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#26364A]">
              Eventos Aguardando Moderação ({eventosPendentes.length})
            </h2>
          </div>

          {eventosPendentes.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#CFE2F5] shadow-[0_4px_16px_rgba(38,54,74,0.06)] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#26364A]">Nenhum evento pendente no momento</h3>
              <p className="text-xs text-[#718096] max-w-sm mx-auto">
                Todos os eventos enviados pela comunidade foram revisados e publicados.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {eventosPendentes.map((evento) => (
                <div
                  key={evento.id}
                  className="bg-white rounded-2xl border border-amber-300 p-6 shadow-[0_4px_16px_rgba(38,54,74,0.06)] flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md">
                        Aguardando Revisão
                      </span>
                      <span className="bg-[#EAF4FC] text-[#5B8DEF] text-xs font-semibold px-2.5 py-1 rounded-md">
                        {evento.categoria}
                      </span>
                      {evento.cidade && (
                        <span className="text-xs text-[#718096] font-medium flex items-center gap-1">
                          <svg className="w-3 h-3 text-[#5B8DEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{evento.cidade}</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#26364A] leading-snug">
                        {evento.titulo}
                      </h3>
                      <p className="text-sm text-[#718096] mt-1.5 leading-relaxed">
                        {evento.descricao}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#718096] bg-[#F5F9FC] p-3.5 rounded-xl border border-slate-200/70">
                      <div>
                        <strong>Data:</strong> {evento.data} {evento.horario ? `(${evento.horario})` : ''}
                      </div>
                      <div>
                        <strong>Local:</strong> {evento.local || 'Não informado'}
                      </div>
                      <div>
                        <strong>Organizador:</strong> {evento.autor || 'Anônimo'}
                      </div>
                      {evento.contato && (
                        <div className="sm:col-span-3 text-[#5B8DEF] font-semibold pt-1 border-t border-slate-200/50">
                          Contato: {evento.contato}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ações de Moderação */}
                  <div className="flex md:flex-col items-center justify-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleAprovar(evento.id, evento.titulo)}
                      className="w-full clay-button font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-all disabled:opacity-50 text-center"
                    >
                      Aprovar Evento
                    </button>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        setModalRejeitarEvento({
                          isOpen: true,
                          id: evento.id,
                          titulo: evento.titulo,
                        })
                      }
                      className="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs px-5 py-3 rounded-xl transition-colors disabled:opacity-50 text-center"
                    >
                      Rejeitar
                    </button>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => {
                        setEventoEditando(evento);
                        setModalEventoAberto(true);
                      }}
                      className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors text-center"
                    >
                      Editar Dados
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ABA 2: TODOS OS EVENTOS */}
      {abaAtiva === 'eventos' && (
        <div className="space-y-6">
          {/* Controles de Filtro e Criação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-[#CFE2F5] shadow-[0_4px_16px_rgba(38,54,74,0.06)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#718096] uppercase tracking-wider">Status:</span>
              {(['todos', 'aprovado', 'pendente', 'rejeitado'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFiltroStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filtroStatus === st
                      ? 'bg-[#5B8DEF] text-white'
                      : 'bg-[#F5F9FC] text-[#718096] hover:bg-[#EAF4FC]'
                  }`}
                >
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={buscaEvento}
                onChange={(e) => setBuscaEvento(e.target.value)}
                placeholder="Buscar eventos..."
                className="w-full sm:w-60 px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A] placeholder-[#718096] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF]"
              />
              <button
                type="button"
                onClick={() => {
                  setEventoEditando(null);
                  setModalEventoAberto(true);
                }}
                className="clay-button font-bold text-xs px-4 py-2.5 rounded-xl shrink-0 shadow-xs"
              >
                + Novo Evento
              </button>
            </div>
          </div>

          {/* Listagem de Eventos */}
          {eventosFiltrados.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#CFE2F5] space-y-2">
              <p className="text-sm font-semibold text-[#26364A]">Nenhum evento encontrado com os filtros atuais.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#CFE2F5] overflow-hidden shadow-[0_4px_16px_rgba(38,54,74,0.06)]">
              <div className="divide-y divide-slate-100">
                {eventosFiltrados.map((evento) => {
                  const status = evento.status || 'aprovado';
                  return (
                    <div
                      key={evento.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F5F9FC]/60 transition-colors"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                              status === 'aprovado'
                                ? 'bg-emerald-100 text-emerald-800'
                                : status === 'pendente'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {status}
                          </span>
                          <span className="text-xs font-semibold text-[#5B8DEF]">
                            {evento.categoria}
                          </span>
                          {evento.cidade && (
                            <span className="text-xs text-[#718096]">
                              • {evento.cidade}
                            </span>
                          )}
                          {evento.data && (
                            <span className="text-xs text-[#718096]">
                              • {evento.data}
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-[#26364A] leading-snug">
                          {evento.titulo}
                        </h4>
                        <p className="text-xs text-[#718096] line-clamp-2">
                          {evento.descricao}
                        </p>
                      </div>

                      {/* Botões de Ação na Lista */}
                      <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                        {status !== 'aprovado' && (
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleAprovar(evento.id, evento.titulo)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors"
                          >
                            Aprovar
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setEventoEditando(evento);
                            setModalEventoAberto(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#F5F9FC] hover:bg-[#EAF4FC] text-[#5B8DEF] font-semibold text-xs border border-slate-200 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setModalExcluirEvento({
                              isOpen: true,
                              id: evento.id,
                              titulo: evento.titulo,
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs border border-red-200 transition-colors"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ABA 3: GERENCIAMENTO DE GRÊMIOS */}
      {abaAtiva === 'gremios' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-[#CFE2F5] shadow-[0_4px_16px_rgba(38,54,74,0.06)]">
            <input
              type="text"
              value={buscaGremio}
              onChange={(e) => setBuscaGremio(e.target.value)}
              placeholder="Buscar grêmios por nome ou escola..."
              className="w-full sm:w-80 px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A] placeholder-[#718096] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF]"
            />

            <button
              type="button"
              onClick={() => {
                setGremioEditando(null);
                setModalGremioAberto(true);
              }}
              className="clay-button font-bold text-xs px-5 py-2.5 rounded-xl shrink-0 shadow-xs"
            >
              + Cadastrar Novo Grêmio
            </button>
          </div>

          {gremiosFiltrados.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#CFE2F5] space-y-2">
              <p className="text-sm font-semibold text-[#26364A]">Nenhum grêmio encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gremiosFiltrados.map((gremio) => (
                <div
                  key={gremio.id}
                  className="bg-white rounded-2xl border border-[#CFE2F5] p-6 shadow-[0_4px_16px_rgba(38,54,74,0.06)] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#5B8DEF] uppercase tracking-wide">
                        {gremio.cidade}
                      </span>
                      <span className="text-xs bg-[#EAF4FC] text-[#5B8DEF] font-bold px-2 py-0.5 rounded-md">
                        Gestão {gremio.anoGestao}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#26364A]">{gremio.nome}</h4>
                      <p className="text-xs font-semibold text-[#718096]">{gremio.escola}</p>
                    </div>

                    <p className="text-xs text-[#718096] line-clamp-3 leading-relaxed">
                      {gremio.descricao}
                    </p>

                    <div className="text-xs text-[#718096] bg-[#F5F9FC] p-3 rounded-xl border border-slate-200/70 space-y-1">
                      <div><strong>Presidente:</strong> {gremio.presidente}</div>
                      <div><strong>Contato:</strong> {gremio.contato} {gremio.email ? `(${gremio.email})` : ''}</div>
                      {gremio.instagram && <div><strong>Instagram:</strong> {gremio.instagram}</div>}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setGremioEditando(gremio);
                        setModalGremioAberto(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#F5F9FC] hover:bg-[#EAF4FC] text-[#5B8DEF] font-bold text-xs border border-[#CFE2F5] transition-colors"
                    >
                      Editar Informações
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setModalExcluirGremio({
                          isOpen: true,
                          id: gremio.id,
                          nome: gremio.nome,
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE REJEIÇÃO */}
      <ModalConfirmacao
        isOpen={modalRejeitarEvento.isOpen}
        onClose={() => setModalRejeitarEvento({ isOpen: false, id: '', titulo: '' })}
        onConfirm={handleConfirmarRejeitar}
        titulo="Rejeitar publicação do evento?"
        mensagem={`Tem certeza de que deseja rejeitar o evento "${modalRejeitarEvento.titulo}"? Ele não será publicado no portal público.`}
        textoConfirmar="Sim, Rejeitar Evento"
        tipoPerigo={true}
        carregando={isPending}
      />

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DE EVENTO */}
      <ModalConfirmacao
        isOpen={modalExcluirEvento.isOpen}
        onClose={() => setModalExcluirEvento({ isOpen: false, id: '', titulo: '' })}
        onConfirm={handleConfirmarExcluirEvento}
        titulo="Excluir evento definitivamente?"
        mensagem={`Esta ação removerá o evento "${modalExcluirEvento.titulo}" do sistema. Essa operação não pode ser desfeita.`}
        textoConfirmar="Excluir Evento"
        tipoPerigo={true}
        carregando={isPending}
      />

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DE GRÊMIO */}
      <ModalConfirmacao
        isOpen={modalExcluirGremio.isOpen}
        onClose={() => setModalExcluirGremio({ isOpen: false, id: '', nome: '' })}
        onConfirm={handleConfirmarExcluirGremio}
        titulo="Excluir cadastro do grêmio?"
        mensagem={`Tem certeza de que deseja remover o cadastro do "${modalExcluirGremio.nome}"?`}
        textoConfirmar="Excluir Grêmio"
        tipoPerigo={true}
        carregando={isPending}
      />

      {/* MODAL / FORMULÁRIO DE EDIÇÃO DE EVENTO */}
      {modalEventoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26364A]/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#CFE2F5] shadow-2xl my-8 space-y-5 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-[#26364A]">
                {eventoEditando ? 'Editar Evento' : 'Novo Evento no Portal'}
              </h3>
              <button
                type="button"
                onClick={() => setModalEventoAberto(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarEvento} className="space-y-4">
              {eventoEditando?.id && (
                <input type="hidden" name="id" value={eventoEditando.id} />
              )}

              <div>
                <label className="block text-xs font-bold text-[#26364A] mb-1">Título</label>
                <input
                  type="text"
                  name="titulo"
                  required
                  defaultValue={eventoEditando?.titulo || ''}
                  className="w-full px-3.5 py-2.5 bg-[#F5F9FC] border border-slate-200 rounded-xl text-sm text-[#26364A] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Categoria</label>
                  <select
                    name="categoria"
                    required
                    defaultValue={eventoEditando?.categoria || 'Cultura'}
                    className="w-full px-3 py-2.5 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  >
                    {CATEGORIAS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Status</label>
                  <select
                    name="status"
                    required
                    defaultValue={eventoEditando?.status || 'aprovado'}
                    className="w-full px-3 py-2.5 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  >
                    <option value="aprovado">Aprovado</option>
                    <option value="pendente">Pendente</option>
                    <option value="rejeitado">Rejeitado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Município</label>
                  <select
                    name="cidade"
                    required
                    defaultValue={eventoEditando?.cidade || 'São Sebastião'}
                    className="w-full px-3 py-2.5 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  >
                    {CIDADES.map((cid) => (
                      <option key={cid} value={cid}>{cid}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Data</label>
                  <input
                    type="date"
                    name="data"
                    required
                    defaultValue={eventoEditando?.data || ''}
                    className="w-full px-3.5 py-2.5 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Horário</label>
                  <input
                    type="text"
                    name="horario"
                    defaultValue={eventoEditando?.horario || ''}
                    placeholder="Ex: 14:00"
                    className="w-full px-3.5 py-2.5 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#26364A] mb-1">Local</label>
                <input
                  type="text"
                  name="local"
                  required
                  defaultValue={eventoEditando?.local || ''}
                  className="w-full px-3.5 py-2.5 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#26364A] mb-1">Descrição</label>
                <textarea
                  name="descricao"
                  rows={4}
                  required
                  defaultValue={eventoEditando?.descricao || ''}
                  className="w-full p-3 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Organizador / Autor</label>
                  <input
                    type="text"
                    name="autor"
                    defaultValue={eventoEditando?.autor || ''}
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Contato</label>
                  <input
                    type="text"
                    name="contato"
                    defaultValue={eventoEditando?.contato || ''}
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalEventoAberto(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-[#718096] text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="clay-button font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm"
                >
                  {isPending ? 'Salvando...' : 'Salvar Evento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL / FORMULÁRIO DE EDIÇÃO DE GRÊMIO */}
      {modalGremioAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26364A]/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#CFE2F5] shadow-2xl my-8 space-y-5 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-[#26364A]">
                {gremioEditando ? 'Editar Grêmio Estudantil' : 'Novo Grêmio Estudantil'}
              </h3>
              <button
                type="button"
                onClick={() => setModalGremioAberto(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarGremio} className="space-y-4">
              {gremioEditando?.id && (
                <input type="hidden" name="id" value={gremioEditando.id} />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Nome do Grêmio</label>
                  <input
                    type="text"
                    name="nome"
                    required
                    defaultValue={gremioEditando?.nome || ''}
                    placeholder="Ex: Grêmio Voz Ativa"
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Escola / Unidade</label>
                  <input
                    type="text"
                    name="escola"
                    required
                    defaultValue={gremioEditando?.escola || ''}
                    placeholder="Ex: E.E. Henrique Botelho"
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Município</label>
                  <select
                    name="cidade"
                    required
                    defaultValue={gremioEditando?.cidade || 'São Sebastião'}
                    className="w-full px-3 py-2.5 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  >
                    {CIDADES.map((cid) => (
                      <option key={cid} value={cid}>{cid}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Ano de Gestão</label>
                  <input
                    type="text"
                    name="anoGestao"
                    required
                    defaultValue={gremioEditando?.anoGestao || '2026/2027'}
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Membros Ativos</label>
                  <input
                    type="number"
                    name="membros"
                    defaultValue={gremioEditando?.membros || 10}
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#26364A] mb-1">Descrição / Propostas</label>
                <textarea
                  name="descricao"
                  rows={3}
                  required
                  defaultValue={gremioEditando?.descricao || ''}
                  className="w-full p-3 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Presidente</label>
                  <input
                    type="text"
                    name="presidente"
                    required
                    defaultValue={gremioEditando?.presidente || ''}
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    name="contato"
                    required
                    defaultValue={gremioEditando?.contato || ''}
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    defaultValue={gremioEditando?.instagram || ''}
                    placeholder="@gremio"
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#26364A] mb-1">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={gremioEditando?.email || ''}
                    className="w-full px-3.5 py-2 bg-[#F5F9FC] border border-slate-200 rounded-xl text-xs text-[#26364A]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalGremioAberto(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-[#718096] text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="clay-button font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm"
                >
                  {isPending ? 'Salvando...' : 'Salvar Grêmio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
