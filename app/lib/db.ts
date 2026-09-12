import {
  ItemDados,
  GremioEstudantil,
  StatusEvento,
  dadosFicticios,
  gremiosIniciais,
} from '../dados';

declare global {
  var __mareln_eventos: ItemDados[] | undefined;
  var __mareln_gremios: GremioEstudantil[] | undefined;
}

// Inicialização segura em memória no globalThis do Node.js
function getEventosStore(): ItemDados[] {
  if (!globalThis.__mareln_eventos) {
    globalThis.__mareln_eventos = JSON.parse(JSON.stringify(dadosFicticios));
  }
  return globalThis.__mareln_eventos!;
}

function getGremiosStore(): GremioEstudantil[] {
  if (!globalThis.__mareln_gremios) {
    globalThis.__mareln_gremios = JSON.parse(JSON.stringify(gremiosIniciais));
  }
  return globalThis.__mareln_gremios!;
}

// === EVENTOS ===

export async function getEventos(filtros?: {
  status?: StatusEvento | 'todos';
  categoria?: string;
  cidade?: string;
  gremioId?: string;
  busca?: string;
}): Promise<ItemDados[]> {
  const store = getEventosStore();
  let resultado = [...store];

  if (filtros?.status && filtros.status !== 'todos') {
    resultado = resultado.filter((e) => (e.status || 'aprovado') === filtros.status);
  }

  if (filtros?.categoria && filtros.categoria !== 'Todas') {
    resultado = resultado.filter((e) => e.categoria.toLowerCase() === filtros.categoria!.toLowerCase());
  }

  if (filtros?.cidade && filtros.cidade !== 'Todas') {
    resultado = resultado.filter((e) => e.cidade === filtros.cidade);
  }

  if (filtros?.gremioId) {
    resultado = resultado.filter((e) => e.gremioId === filtros.gremioId);
  }

  if (filtros?.busca && filtros.busca.trim() !== '') {
    const termo = filtros.busca.toLowerCase().trim();
    resultado = resultado.filter(
      (e) =>
        e.titulo.toLowerCase().includes(termo) ||
        e.descricao.toLowerCase().includes(termo) ||
        (e.local && e.local.toLowerCase().includes(termo)) ||
        (e.autor && e.autor.toLowerCase().includes(termo))
    );
  }

  return resultado;
}

export async function getEventoById(id: string): Promise<ItemDados | null> {
  const store = getEventosStore();
  const evento = store.find((e) => e.id === id);
  return evento ? { ...evento } : null;
}

export async function createEvento(
  dados: Omit<ItemDados, 'id' | 'dataCriacao'>
): Promise<ItemDados> {
  const store = getEventosStore();
  const novoId = String(Date.now());
  const novoEvento: ItemDados = {
    ...dados,
    id: novoId,
    status: dados.status || 'pendente',
    dataCriacao: new Date().toISOString().split('T')[0],
  };

  store.unshift(novoEvento);
  return { ...novoEvento };
}

export async function updateEvento(
  id: string,
  dados: Partial<ItemDados>
): Promise<ItemDados | null> {
  const store = getEventosStore();
  const index = store.findIndex((e) => e.id === id);
  if (index === -1) return null;

  store[index] = {
    ...store[index],
    ...dados,
    id, // garante imutabilidade do ID
  };

  return { ...store[index] };
}

export async function deleteEvento(id: string): Promise<boolean> {
  const store = getEventosStore();
  const index = store.findIndex((e) => e.id === id);
  if (index === -1) return false;

  store.splice(index, 1);
  return true;
}

// === GRÊMIOS ===

export async function getGremios(filtros?: {
  cidade?: string;
  busca?: string;
}): Promise<GremioEstudantil[]> {
  const store = getGremiosStore();
  let resultado = [...store];

  if (filtros?.cidade && filtros.cidade !== 'Todas') {
    resultado = resultado.filter((g) => g.cidade === filtros.cidade);
  }

  if (filtros?.busca && filtros.busca.trim() !== '') {
    const termo = filtros.busca.toLowerCase().trim();
    resultado = resultado.filter(
      (g) =>
        g.nome.toLowerCase().includes(termo) ||
        g.escola.toLowerCase().includes(termo) ||
        g.descricao.toLowerCase().includes(termo) ||
        g.presidente.toLowerCase().includes(termo)
    );
  }

  return resultado;
}

export async function getGremioById(id: string): Promise<GremioEstudantil | null> {
  const store = getGremiosStore();
  const gremio = store.find((g) => g.id === id);
  return gremio ? { ...gremio } : null;
}

export async function createGremio(
  dados: Omit<GremioEstudantil, 'id'>
): Promise<GremioEstudantil> {
  const store = getGremiosStore();
  const novoId = `gremio-${Date.now()}`;
  const novoGremio: GremioEstudantil = {
    ...dados,
    id: novoId,
  };

  store.push(novoGremio);
  return { ...novoGremio };
}

export async function updateGremio(
  id: string,
  dados: Partial<GremioEstudantil>
): Promise<GremioEstudantil | null> {
  const store = getGremiosStore();
  const index = store.findIndex((g) => g.id === id);
  if (index === -1) return null;

  store[index] = {
    ...store[index],
    ...dados,
    id,
  };

  return { ...store[index] };
}

export async function deleteGremio(id: string): Promise<boolean> {
  const store = getGremiosStore();
  const index = store.findIndex((g) => g.id === id);
  if (index === -1) return false;

  store.splice(index, 1);
  return true;
}
