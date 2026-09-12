'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { GremioEstudantil } from '../dados';
import { submeterEventoAction, SubmissaoEventoState } from '../lib/actions';

interface DivulgarEventoClientProps {
  gremios: GremioEstudantil[];
  gremioSelecionadoInicial?: string;
}

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
] as const;

const CIDADES = [
  'Caraguatatuba',
  'Ilhabela',
  'São Sebastião',
  'Ubatuba',
] as const;

const inputBase =
  'w-full min-h-[48px] px-4 py-3 bg-background border rounded-xl text-sm text-foreground placeholder-gray focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ease-out';
const inputOk = 'border-primary/40 focus:ring-primary';
const inputError = 'border-red-400 focus:ring-red-400';

function RequiredMark() {
  return (
    <span className="text-red-500" aria-hidden="true">
      {' '}
      *
    </span>
  );
}

export default function DivulgarEventoClient({
  gremios,
  gremioSelecionadoInicial = '',
}: DivulgarEventoClientProps) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<SubmissaoEventoState>({});
  const [enviadoComSucesso, setEnviadoComSucesso] = useState(false);

  // Campos do formulário para preservação
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'Cultura',
    data: '',
    horario: '',
    local: '',
    cidade: 'São Sebastião',
    autor: '',
    contato: '',
    imagem: '',
    gremioId: gremioSelecionadoInicial,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val);
    });

    startTransition(async () => {
      const result = await submeterEventoAction({}, data);
      setState(result);
      if (result.success) {
        setEnviadoComSucesso(true);
      }
    });
  };

  const reiniciarFormulario = () => {
    setFormData({
      titulo: '',
      descricao: '',
      categoria: 'Cultura',
      data: '',
      horario: '',
      local: '',
      cidade: 'São Sebastião',
      autor: '',
      contato: '',
      imagem: '',
      gremioId: '',
    });
    setState({});
    setEnviadoComSucesso(false);
  };

  if (enviadoComSucesso) {
    return (
      <div
        className="bg-white rounded-3xl p-8 sm:p-12 border border-light-blue shadow-[0_8px_30px_rgba(38,54,74,0.08)] max-w-2xl mx-auto text-center space-y-6"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-soft-blue text-primary rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Etapa de Análise
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Evento enviado com sucesso!
          </h2>
          <p className="text-sm text-gray leading-relaxed max-w-md mx-auto">
            Sua proposta foi cadastrada e encaminhada para a moderação da equipe do <strong>MaréLN</strong>. Assim que for revisada e aprovada pelo administrador, ela ficará disponível publicamente no portal.
          </p>
        </div>

        <div className="p-4 bg-background rounded-2xl border border-light-blue text-left text-xs text-gray space-y-2">
          <div className="font-bold text-foreground">Resumo da solicitação:</div>
          <div>• <strong>Título:</strong> {formData.titulo}</div>
          <div>• <strong>Data:</strong> {formData.data} {formData.horario ? `às ${formData.horario}` : ''}</div>
          <div>• <strong>Local:</strong> {formData.local} ({formData.cidade})</div>
          <div>• <strong>Status:</strong> <span className="inline-block bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md">Pendente para Moderação</span></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={reiniciarFormulario}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-foreground hover:bg-slate-50 font-semibold text-sm transition-colors duration-200 ease-out"
          >
            Divulgar outro evento
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto clay-button font-bold text-sm px-8 py-3 rounded-xl shadow-md text-center"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    );
  }

  const hasErrors = !!state.errors && Object.keys(state.errors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Mensagem de Erro Geral */}
      {hasErrors && (
        <div
          className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm space-y-1 shadow-xs"
          role="alert"
          aria-live="assertive"
        >
          <div className="font-bold flex items-center gap-2">
            <svg className="w-4 h-4 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Por favor, corrija os seguintes campos antes de enviar:</span>
          </div>
          <ul className="list-disc list-inside text-xs space-y-0.5 pl-6">
            {Object.values(state.errors ?? {}).map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Seção 1: Dados do Evento */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-primary shadow-[0_4px_20px_rgba(38,54,74,0.06)] space-y-6">
        <h2 className="text-xl font-bold text-foreground border-b border-slate-100 pb-3 flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-soft-blue text-primary text-xs font-extrabold shrink-0">
            1
          </span>
          <span>Informações do Evento</span>
        </h2>

        {/* Título */}
        <div className="space-y-2">
          <label htmlFor="titulo" className="block text-sm font-semibold text-foreground">
            Título do Evento
            <RequiredMark />
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            required
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ex: 2º Torneio Interescolar de Xadrez e Robótica"
            aria-invalid={!!state.errors?.titulo}
            aria-describedby={state.errors?.titulo ? 'titulo-error' : undefined}
            className={`${inputBase} ${state.errors?.titulo ? inputError : inputOk}`}
          />
          {state.errors?.titulo && (
            <p id="titulo-error" className="text-xs font-semibold text-red-500">
              {state.errors.titulo}
            </p>
          )}
        </div>

        {/* Categoria e Grêmio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="categoria" className="block text-sm font-semibold text-foreground">
              Categoria
              <RequiredMark />
            </label>
            <select
              id="categoria"
              name="categoria"
              required
              value={formData.categoria}
              onChange={handleChange}
              className={`${inputBase} ${inputOk}`}
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="gremioId" className="block text-sm font-semibold text-foreground">
              Grêmio / Escola Parceira{' '}
              <span className="text-xs text-gray font-normal">(Opcional)</span>
            </label>
            <select
              id="gremioId"
              name="gremioId"
              value={formData.gremioId}
              onChange={handleChange}
              className={`${inputBase} ${inputOk}`}
            >
              <option value="">Nenhum / Iniciativa independente</option>
              {gremios.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nome} — {g.escola} ({g.cidade})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Data e Horário */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="data" className="block text-sm font-semibold text-foreground">
              Data de Realização
              <RequiredMark />
            </label>
            <input
              type="date"
              id="data"
              name="data"
              required
              value={formData.data}
              onChange={handleChange}
              aria-invalid={!!state.errors?.data}
              aria-describedby={state.errors?.data ? 'data-error' : undefined}
              className={`${inputBase} ${state.errors?.data ? inputError : inputOk}`}
            />
            {state.errors?.data && (
              <p id="data-error" className="text-xs font-semibold text-red-500">
                {state.errors.data}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="horario" className="block text-sm font-semibold text-foreground">
              Horário / Período{' '}
              <span className="text-xs text-gray font-normal">(Opcional)</span>
            </label>
            <input
              type="text"
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              placeholder="Ex: 14:00 às 18:00"
              className={`${inputBase} ${inputOk}`}
            />
          </div>
        </div>

        {/* Município e Local */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="cidade" className="block text-sm font-semibold text-foreground">
              Município
              <RequiredMark />
            </label>
            <select
              id="cidade"
              name="cidade"
              required
              value={formData.cidade}
              onChange={handleChange}
              className={`${inputBase} ${inputOk}`}
            >
              {CIDADES.map((cid) => (
                <option key={cid} value={cid}>
                  {cid}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label htmlFor="local" className="block text-sm font-semibold text-foreground">
              Local / Endereço Completo
              <RequiredMark />
            </label>
            <input
              type="text"
              id="local"
              name="local"
              required
              value={formData.local}
              onChange={handleChange}
              placeholder="Ex: Pátio da Escola Estadual Henrique Botelho, Centro"
              aria-invalid={!!state.errors?.local}
              aria-describedby={state.errors?.local ? 'local-error' : undefined}
              className={`${inputBase} ${state.errors?.local ? inputError : inputOk}`}
            />
            {state.errors?.local && (
              <p id="local-error" className="text-xs font-semibold text-red-500">
                {state.errors.local}
              </p>
            )}
          </div>
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <label htmlFor="descricao" className="block text-sm font-semibold text-foreground">
            Descrição Completa do Evento
            <RequiredMark />
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows={5}
            required
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Conte os detalhes do evento: objetivos, programação, se é gratuito, premiações, como se inscrever e o que esperar..."
            aria-invalid={!!state.errors?.descricao}
            aria-describedby={state.errors?.descricao ? 'descricao-error' : undefined}
            className={`min-h-[140px] p-4 bg-background border rounded-xl text-sm text-foreground placeholder-gray focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ease-out w-full ${
              state.errors?.descricao ? inputError : inputOk
            }`}
          />
          {state.errors?.descricao && (
            <p id="descricao-error" className="text-xs font-semibold text-red-500">
              {state.errors.descricao}
            </p>
          )}
        </div>

        {/* URL da Imagem */}
        <div className="space-y-2">
          <label htmlFor="imagem" className="block text-sm font-semibold text-foreground">
            URL da Imagem de Divulgação ou Cartaz{' '}
            <span className="text-xs text-gray font-normal">
              (Opcional — caso deixe vazio, usaremos uma foto representativa)
            </span>
          </label>
          <input
            type="url"
            id="imagem"
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
            placeholder="https://exemplo.com/cartaz-evento.jpg"
            className={`${inputBase} ${inputOk}`}
          />
        </div>
      </div>

      {/* Seção 2: Dados do Responsável / Validação */}
      <div className="bg-primary rounded-3xl p-6 sm:p-10 shadow-[0_4px_20px_rgba(38,54,74,0.18)] space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-white/20 pb-3 flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white text-primary text-xs font-extrabold shrink-0">
            2
          </span>
          <span>Responsável pela Divulgação</span>
        </h2>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="autor" className="block text-sm font-semibold text-white">
              Nome do Organizador / Grupo
              <RequiredMark />
            </label>
            <input
              type="text"
              id="autor"
              name="autor"
              required
              value={formData.autor}
              onChange={handleChange}
              placeholder="Ex: Comissão de Alunos do 3º Técnico"
              aria-invalid={!!state.errors?.autor}
              aria-describedby={state.errors?.autor ? 'autor-error' : undefined}
              className={`w-full min-h-[48px] px-4 py-3 bg-white border rounded-xl text-sm text-foreground placeholder-gray focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 ease-out ${
                state.errors?.autor ? 'border-red-400' : 'border-white/40'
              }`}
            />
            {state.errors?.autor && (
              <p id="autor-error" className="text-xs font-semibold text-red-100">
                {state.errors.autor}
              </p>
            )}
          </div>
 
          <div className="space-y-2">
            <label htmlFor="contato" className="block text-sm font-semibold text-white">
              E-mail ou WhatsApp para contato
              <RequiredMark />
            </label>
            <input
              type="text"
              id="contato"
              name="contato"
              required
              value={formData.contato}
              onChange={handleChange}
              placeholder="Ex: evento@escola.com ou (12) 99876-5432"
              aria-invalid={!!state.errors?.contato}
              aria-describedby={state.errors?.contato ? 'contato-error' : undefined}
              className={`w-full min-h-[48px] px-4 py-3 bg-white border rounded-xl text-sm text-foreground placeholder-gray focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 ease-out ${
                state.errors?.contato ? 'border-red-400' : 'border-white/40'
              }`}
            />
            {state.errors?.contato && (
              <p id="contato-error" className="text-xs font-semibold text-red-100">
                {state.errors.contato}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botões de Ação com Prevenção de Múltiplos Envios */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl border border-slate-200 text-gray hover:bg-slate-50 font-semibold text-sm transition-colors duration-200 ease-out"
        >
          Cancelar
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto clay-button font-bold text-sm px-10 py-4 rounded-xl shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Enviando proposta para análise...</span>
            </>
          ) : (
            <span>Enviar evento para análise</span>
          )}
        </button>
      </div>
    </form>
  );
}