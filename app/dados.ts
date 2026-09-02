export interface ItemDados {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem: string;
  autor?: string;
  preco?: number;
  contato?: string;
}

export const dadosFicticios: ItemDados[] = [
  {
    id: "1",
    titulo: "Grêmio Estudantil anuncia 1º Campeonato Escolar de E-Sports",
    descricao: "As inscrições estão abertas para as equipes de League of Legends e Valorant da rede pública do Litoral Norte. Haverá transmissão ao vivo e premiação com troféus modelados no laboratório maker.",
    categoria: "E-Sports",
    imagem: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    autor: "Prof. Marcos",
  },
  {
    id: "2",
    titulo: "Feira de Ciências e Robótica reúne projetos de despoluição marinha",
    descricao: "Estudantes dos cursos técnicos apresentam protótipos autônomos para recolhimento de resíduos plásticos nas praias e sistemas de captação de água pluvial com automação.",
    categoria: "Tecnologia",
    imagem: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    autor: "Fernanda Lima",
  },
  {
    id: "3",
    titulo: "Clube de Leitura realiza troca de livros e sarau de poesias",
    descricao: "Encontro literário celebra autores locais do Litoral Norte, promove feira de troca de livros didáticos e realiza o lançamento do Fanzine Maré Cultural.",
    categoria: "Cultura",
    imagem: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    autor: "Profª. Sofia Andrade",
  },
  {
    id: "4",
    titulo: "Mutirão Eco-Surfe remove 120kg de resíduos da praia central",
    descricao: "Ação conjunta de preservação ambiental reuniu alunos, professores e comunidade para coleta e destinação consciente de resíduos recicláveis.",
    categoria: "Sustentabilidade",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    autor: "Gabriel Matos",
  },
  {
    id: "5",
    titulo: "Inscrições abertas para as Eleições do Grêmio Estudantil 2026/2027",
    descricao: "Chapas compostas por alunos do 1º ao 3º ano podem submeter propostas e plano de trabalho na coordenação pedagógica até sexta-feira.",
    categoria: "Grêmio",
    imagem: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    autor: "Comissão Eleitoral",
  },
];
