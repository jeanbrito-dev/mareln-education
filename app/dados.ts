export type StatusEvento = 'aprovado' | 'pendente' | 'rejeitado';

export type CidadeLitoralNorte =
  | 'Caraguatatuba'
  | 'Ilhabela'
  | 'São Sebastião'
  | 'Ubatuba';

export interface ItemDados {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem: string;
  autor?: string;
  preco?: number;
  contato?: string;
  // Campos complementares de eventos
  data?: string;
  horario?: string;
  local?: string;
  cidade?: CidadeLitoralNorte;
  status?: StatusEvento;
  gremioId?: string;
  dataCriacao?: string;
}

export interface GremioEstudantil {
  id: string;
  nome: string;
  escola: string;
  cidade: CidadeLitoralNorte;
  descricao: string;
  presidente: string;
  vicePresidente?: string;
  contato: string;
  email?: string;
  instagram?: string;
  anoGestao: string;
  membros: number;
  imagem: string;
  projetosPrincipais: string[];
}

export const dadosFicticios: ItemDados[] = [
  {
    id: "1",
    titulo: "Grêmio Estudantil anuncia 1º Campeonato Escolar de E-Sports",
    descricao: "As inscrições estão abertas para as equipes de League of Legends e Valorant da rede pública do Litoral Norte. Haverá transmissão ao vivo e premiação com troféus modelados no laboratório maker.",
    categoria: "E-Sports",
    imagem: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    autor: "Prof. Marcos",
    data: "2026-10-15",
    horario: "14:00",
    local: "Auditório Central e Transmissão Online",
    cidade: "São Sebastião",
    status: "aprovado",
    gremioId: "gremio-1",
    contato: "esports@mareln.edu.br",
    dataCriacao: "2026-09-01",
  },
  {
    id: "2",
    titulo: "Feira de Ciências e Robótica reúne projetos de despoluição marinha",
    descricao: "Estudantes dos cursos técnicos apresentam protótipos autônomos para recolhimento de resíduos plásticos nas praias e sistemas de captação de água pluvial com automação.",
    categoria: "Tecnologia",
    imagem: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    autor: "Fernanda Lima",
    data: "2026-10-22",
    horario: "09:00 às 17:00",
    local: "Ginásio Poliesportivo Municipal",
    cidade: "Caraguatatuba",
    status: "aprovado",
    gremioId: "gremio-2",
    contato: "robotica@mareln.edu.br",
    dataCriacao: "2026-09-03",
  },
  {
    id: "3",
    titulo: "Clube de Leitura realiza troca de livros e sarau de poesias",
    descricao: "Encontro literário celebra autores locais do Litoral Norte, promove feira de troca de livros didáticos e realiza o lançamento do Fanzine Maré Cultural.",
    categoria: "Cultura",
    imagem: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    autor: "Profª. Sofia Andrade",
    data: "2026-11-05",
    horario: "16:30",
    local: "Biblioteca Pública Comunitária",
    cidade: "Ilhabela",
    status: "aprovado",
    gremioId: "gremio-3",
    contato: "literatura@mareln.edu.br",
    dataCriacao: "2026-09-05",
  },
  {
    id: "4",
    titulo: "Mutirão Eco-Surfe remove 120kg de resíduos da praia central",
    descricao: "Ação conjunta de preservação ambiental reuniu alunos, professores e comunidade para coleta e destinação consciente de resíduos recicláveis.",
    categoria: "Sustentabilidade",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    autor: "Gabriel Matos",
    data: "2026-11-12",
    horario: "08:00",
    local: "Praia do Perequê-Açu",
    cidade: "Ubatuba",
    status: "aprovado",
    gremioId: "gremio-4",
    contato: "ecosurfe@mareln.edu.br",
    dataCriacao: "2026-09-08",
  },
  {
    id: "5",
    titulo: "Inscrições abertas para as Eleições do Grêmio Estudantil 2026/2027",
    descricao: "Chapas compostas por alunos do 1º ao 3º ano podem submeter propostas e plano de trabalho na coordenação pedagógica até sexta-feira.",
    categoria: "Grêmio",
    imagem: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    autor: "Comissão Eleitoral",
    data: "2026-11-20",
    horario: "10:00 às 18:00",
    local: "Pátio Escolar Principal",
    cidade: "São Sebastião",
    status: "aprovado",
    gremioId: "gremio-1",
    contato: "eleicoes@mareln.edu.br",
    dataCriacao: "2026-09-10",
  },
];

export const gremiosIniciais: GremioEstudantil[] = [
  {
    id: "gremio-1",
    nome: "Grêmio Voz Ativa",
    escola: "E.E. Henrique Botelho",
    cidade: "São Sebastião",
    descricao: "Grêmio focado em democratização da voz estudantil, incentivo à cultura caiçara, campeonatos esportivos e inclusão digital na rede pública.",
    presidente: "Lucas Henrique Santana",
    vicePresidente: "Mariana Costa",
    contato: "(12) 99876-1234",
    email: "vozativa@escola.sp.gov.br",
    instagram: "@gremio_vozativa",
    anoGestao: "2026/2027",
    membros: 14,
    imagem: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    projetosPrincipais: [
      "1º Campeonato Escolar de E-Sports",
      "Roda de Conversa Caiçara e Juventude",
      "Cinema no Pátio Semanal"
    ],
  },
  {
    id: "gremio-2",
    nome: "Grêmio Conexão Jovem",
    escola: "ETEC de Caraguatatuba",
    cidade: "Caraguatatuba",
    descricao: "Mobilização em torno de projetos científicos, robótica, workshops técnicos e acolhimento dos novos estudantes dos cursos modulares e integrados.",
    presidente: "Beatriz Nogueira",
    vicePresidente: "Guilherme Santos",
    contato: "(12) 99123-4567",
    email: "conexaojovem@etec.sp.gov.br",
    instagram: "@conexaojovem_etec",
    anoGestao: "2026/2027",
    membros: 18,
    imagem: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    projetosPrincipais: [
      "Feira de Robótica e Sustentabilidade",
      "Mentoria de Estudos para Vestibulares",
      "Hackathon de Inovação Escolar"
    ],
  },
  {
    id: "gremio-3",
    nome: "Grêmio Onda Viva",
    escola: "E.E. Dr. Geraldo de Barros",
    cidade: "Ilhabela",
    descricao: "Representatividade estudantil com ênfase na conservação da Mata Atlântica e do ecossistema marinho, saraus de literatura e intercâmbio esportivo.",
    presidente: "Thiago Mendonça",
    vicePresidente: "Larissa Farias",
    contato: "(12) 99765-4321",
    email: "ondaviva@ilhabela.edu.br",
    instagram: "@gremio_ondaviva",
    anoGestao: "2026/2027",
    membros: 12,
    imagem: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    projetosPrincipais: [
      "Sarau Literário Maré Cultural",
      "Gincana Ecológica Interescolar",
      "Clube de Música e Artes Marciais"
    ],
  },
  {
    id: "gremio-4",
    nome: "Grêmio Maré Verde",
    escola: "E.E. Florentina Martins Sanchez",
    cidade: "Ubatuba",
    descricao: "Engajamento jovem pela preservação das praias, oficinas de surfe educativo, feiras culturais e participação comunitária no Litoral Norte.",
    presidente: "Camila Ribeiro",
    vicePresidente: "Felipe Andrade",
    contato: "(12) 99456-7890",
    email: "mareverde@ubatuba.edu.br",
    instagram: "@mareverde_ubatuba",
    anoGestao: "2026/2027",
    membros: 16,
    imagem: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    projetosPrincipais: [
      "Mutirão Eco-Surfe das Praias",
      "Horta Comunitária na Escola",
      "Torneio Interclasses de Futsal e Vôlei"
    ],
  },
];
