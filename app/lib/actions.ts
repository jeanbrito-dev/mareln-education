'use server';

import { revalidatePath } from 'next/cache';
import {
  createEvento,
  updateEvento,
  deleteEvento,
  createGremio,
  updateGremio,
  deleteGremio,
} from './db';
import {
  isAuthConfigured,
  validateAdminCredentials,
  setAdminSession,
  clearAdminSession,
  isAdminAuthenticated,
} from './auth';
import { CidadeLitoralNorte, StatusEvento } from '../dados';

// === SUBMISSÃO PÚBLICA DE EVENTO ===

export interface SubmissaoEventoState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
  eventoId?: string;
}

export async function submeterEventoAction(
  _prevState: SubmissaoEventoState,
  formData: FormData
): Promise<SubmissaoEventoState> {
  const titulo = formData.get('titulo')?.toString().trim();
  const descricao = formData.get('descricao')?.toString().trim();
  const categoria = formData.get('categoria')?.toString().trim();
  const data = formData.get('data')?.toString().trim();
  const horario = formData.get('horario')?.toString().trim();
  const local = formData.get('local')?.toString().trim();
  const cidade = formData.get('cidade')?.toString().trim() as CidadeLitoralNorte;
  const autor = formData.get('autor')?.toString().trim();
  const contato = formData.get('contato')?.toString().trim();
  const imagem = formData.get('imagem')?.toString().trim();
  const gremioId = formData.get('gremioId')?.toString().trim();

  const errors: Record<string, string> = {};

  if (!titulo || titulo.length < 5) {
    errors.titulo = 'O título deve conter pelo menos 5 caracteres.';
  }
  if (!descricao || descricao.length < 20) {
    errors.descricao = 'A descrição deve conter pelo menos 20 caracteres.';
  }
  if (!categoria) {
    errors.categoria = 'Selecione uma categoria para o evento.';
  }
  if (!data) {
    errors.data = 'Informe a data do evento.';
  }
  if (!cidade || !['Caraguatatuba', 'Ilhabela', 'São Sebastião', 'Ubatuba'].includes(cidade)) {
    errors.cidade = 'Selecione uma cidade válida do Litoral Norte.';
  }
  if (!local) {
    errors.local = 'Informe o local ou endereço do evento.';
  }
  if (!autor) {
    errors.autor = 'Informe o nome do organizador ou responsável.';
  }
  if (!contato) {
    errors.contato = 'Informe um e-mail ou telefone de contato para validação.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // Fallback de imagem padrão do MaréLN se não informada
  const imagemFinal =
    imagem && imagem.startsWith('http')
      ? imagem
      : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';

  const novoEvento = await createEvento({
    titulo: titulo!,
    descricao: descricao!,
    categoria: categoria!,
    imagem: imagemFinal,
    autor,
    contato,
    data,
    horario: horario || undefined,
    local,
    cidade,
    gremioId: gremioId || undefined,
    status: 'pendente',
  });

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/divulgar-evento');

  return {
    success: true,
    message: 'Evento enviado com sucesso! Sua proposta foi encaminhada para análise da equipe MaréLN.',
    eventoId: novoEvento.id,
  };
}

// === AUTENTICAÇÃO ADMINISTRATIVA ===

export interface AdminLoginState {
  success?: boolean;
  error?: string;
}

export async function adminLoginAction(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const password = formData.get('password')?.toString().trim();

  if (!isAuthConfigured()) {
    return {
      success: false,
      error: 'Autenticação administrativa não configurada no servidor. Defina ADMIN_PASSWORD e ADMIN_SESSION_SECRET nas variáveis de ambiente.',
    };
  }

  if (!password) {
    return {
      success: false,
      error: 'Digite a senha de acesso administrativo.',
    };
  }

  const isValid = validateAdminCredentials(password);

  if (!isValid) {
    return {
      success: false,
      error: 'Senha administrativa incorreta. Verifique suas credenciais.',
    };
  }

  const sessionSet = await setAdminSession();
  if (!sessionSet) {
    return {
      success: false,
      error: 'Falha interna ao gerar sessão segura. Verifique as variáveis de ambiente.',
    };
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function adminLogoutAction(): Promise<{ success: boolean }> {
  await clearAdminSession();
  revalidatePath('/admin');
  return { success: true };
}

// === MODERAÇÃO DE EVENTOS ===

export async function aprovarEventoAction(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: 'Acesso negado. Ação restrita a administradores.' };
  }

  const atualizado = await updateEvento(id, { status: 'aprovado' });
  if (!atualizado) {
    return { success: false, error: 'Evento não encontrado.' };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/evento/${id}`);
  return { success: true };
}

export async function rejeitarEventoAction(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: 'Acesso negado. Ação restrita a administradores.' };
  }

  const atualizado = await updateEvento(id, { status: 'rejeitado' });
  if (!atualizado) {
    return { success: false, error: 'Evento não encontrado.' };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/evento/${id}`);
  return { success: true };
}

export async function excluirEventoAction(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: 'Acesso negado. Ação restrita a administradores.' };
  }

  const excluido = await deleteEvento(id);
  if (!excluido) {
    return { success: false, error: 'Evento não encontrado ou já excluído.' };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/favoritos');
  return { success: true };
}

export async function salvarEventoAdminAction(
  formData: FormData
): Promise<{ success: boolean; error?: string; errors?: Record<string, string> }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: 'Acesso negado. Ação restrita a administradores.' };
  }

  const id = formData.get('id')?.toString().trim();
  const titulo = formData.get('titulo')?.toString().trim();
  const descricao = formData.get('descricao')?.toString().trim();
  const categoria = formData.get('categoria')?.toString().trim();
  const data = formData.get('data')?.toString().trim();
  const horario = formData.get('horario')?.toString().trim();
  const local = formData.get('local')?.toString().trim();
  const cidade = formData.get('cidade')?.toString().trim() as CidadeLitoralNorte;
  const autor = formData.get('autor')?.toString().trim();
  const contato = formData.get('contato')?.toString().trim();
  const imagem = formData.get('imagem')?.toString().trim();
  const status = formData.get('status')?.toString().trim() as StatusEvento;
  const gremioId = formData.get('gremioId')?.toString().trim();

  if (!titulo || !descricao || !categoria || !data || !cidade || !local) {
    return { success: false, error: 'Preencha todos os campos obrigatórios.' };
  }

  const dadosEvento = {
    titulo,
    descricao,
    categoria,
    data,
    horario: horario || undefined,
    local,
    cidade,
    autor: autor || undefined,
    contato: contato || undefined,
    imagem: imagem || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    status: status || 'aprovado',
    gremioId: gremioId || undefined,
  };

  if (id) {
    await updateEvento(id, dadosEvento);
  } else {
    await createEvento(dadosEvento);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  if (id) revalidatePath(`/evento/${id}`);

  return { success: true };
}

// === GERENCIAMENTO DE GRÊMIOS ===

export async function salvarGremioAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: 'Acesso negado. Ação restrita a administradores.' };
  }

  const id = formData.get('id')?.toString().trim();
  const nome = formData.get('nome')?.toString().trim();
  const escola = formData.get('escola')?.toString().trim();
  const cidade = formData.get('cidade')?.toString().trim() as CidadeLitoralNorte;
  const descricao = formData.get('descricao')?.toString().trim();
  const presidente = formData.get('presidente')?.toString().trim();
  const vicePresidente = formData.get('vicePresidente')?.toString().trim();
  const contato = formData.get('contato')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const instagram = formData.get('instagram')?.toString().trim();
  const anoGestao = formData.get('anoGestao')?.toString().trim();
  const membros = parseInt(formData.get('membros')?.toString() || '10', 10);
  const imagem = formData.get('imagem')?.toString().trim();
  const projetosRaw = formData.get('projetosPrincipais')?.toString().trim();

  if (!nome || !escola || !cidade || !descricao || !presidente || !contato || !anoGestao) {
    return { success: false, error: 'Preencha todos os campos obrigatórios do grêmio.' };
  }

  const projetosPrincipais = projetosRaw
    ? projetosRaw.split('\n').map((p) => p.trim()).filter((p) => p.length > 0)
    : [];

  const imagemFinal =
    imagem && imagem.startsWith('http')
      ? imagem
      : 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80';

  const dadosGremio = {
    nome,
    escola,
    cidade,
    descricao,
    presidente,
    vicePresidente: vicePresidente || undefined,
    contato,
    email: email || undefined,
    instagram: instagram || undefined,
    anoGestao,
    membros: isNaN(membros) ? 10 : membros,
    imagem: imagemFinal,
    projetosPrincipais,
  };

  if (id) {
    await updateGremio(id, dadosGremio);
  } else {
    await createGremio(dadosGremio);
  }

  revalidatePath('/gremios');
  revalidatePath('/admin');
  return { success: true };
}

export async function excluirGremioAction(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: 'Acesso negado. Ação restrita a administradores.' };
  }

  const excluido = await deleteGremio(id);
  if (!excluido) {
    return { success: false, error: 'Grêmio não encontrado ou já excluído.' };
  }

  revalidatePath('/gremios');
  revalidatePath('/admin');
  return { success: true };
}
