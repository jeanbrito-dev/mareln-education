# MaréLN — Rules & Development Guidelines

> Documento obrigatório para qualquer alteração no projeto.
> O objetivo é evoluir o MaréLN para um sistema real, público e utilizável sem descaracterizar sua identidade visual atual.

---

## 1. Objetivo do projeto

O MaréLN é um portal de descoberta e divulgação de eventos do Litoral Norte de São Paulo.

O sistema deverá permitir:

* usuários encontrarem eventos;
* usuários filtrarem e pesquisarem eventos;
* usuários salvarem eventos nos favoritos;
* divulgação de eventos por organizadores;
* gerenciamento dos eventos pelo administrador;
* gerenciamento do sistema de grêmios;
* navegação simples e rápida em dispositivos móveis;
* funcionamento adequado em ambiente público de produção.

O sistema deve priorizar:

1. simplicidade;
2. confiabilidade;
3. clareza;
4. boa experiência mobile;
5. velocidade;
6. manutenção fácil;
7. segurança adequada ao escopo;
8. consistência visual.

---

# 2. Regra principal: não descaracterizar o MaréLN

As novas funcionalidades devem parecer parte do mesmo produto.

Não criar uma nova identidade visual para:

* painel administrativo;
* página de divulgação;
* sistema de grêmios;
* formulários;
* páginas auxiliares.

Todas as novas interfaces devem utilizar a linguagem visual já existente no projeto.

### Identidade visual atual

Primary:

`#5B8DEF`

Secondary:

`#7C83E8`

Accent:

`#8CC8E8`

Background:

`#F5F9FC`

Foreground:

`#26364A`

Gray:

`#718096`

Light blue:

`#DCEEFF`

White:

`#FFFFFF`

### Estilo

O design deve ser:

* moderno;
* limpo;
* leve;
* profissional;
* responsivo;
* com bastante espaço visual;
* baseado em cards e superfícies claras;
* com bordas suaves;
* com sombras discretas;
* com azul como cor principal;
* com referências sutis ao mar.

Evitar:

* excesso de gradientes;
* excesso de sombras;
* excesso de animações;
* interfaces muito coloridas;
* amarelo ou laranja como cores principais;
* estética infantil;
* estética genérica de dashboard;
* visual "template pronto";
* elementos decorativos sem função.

---

# 3. Não adicionar bibliotecas ou frameworks

Não instalar novas bibliotecas ou frameworks sem necessidade explícita.

Utilizar prioritariamente:

* Next.js já existente;
* React já existente;
* TypeScript;
* Tailwind CSS;
* APIs nativas do navegador;
* recursos já existentes no projeto;
* recursos já existentes do Next.js.

Não adicionar:

* Redux;
* Zustand;
* TanStack Query;
* SWR;
* novas bibliotecas de UI;
* novos frameworks CSS;
* novas bibliotecas de animação;
* novas bibliotecas de formulários;
* novas bibliotecas de autenticação;

a menos que exista uma necessidade técnica real e essa adição seja autorizada.

---

# 4. Arquitetura Next.js

O projeto utiliza Next.js App Router.

Preferir Server Components por padrão.

Utilizar `"use client"` somente quando o componente realmente precisar de:

* `useState`;
* `useEffect`;
* eventos de interação;
* APIs do navegador;
* `localStorage`;
* comportamento exclusivamente client-side.

Não transformar páginas inteiras em Client Components apenas para utilizar uma pequena interação.

Sempre que possível:

```text
Server Component
    ↓
componente interativo isolado
```

---

# 5. Estado e interatividade

Utilizar React state somente quando existir uma necessidade real de estado.

Exemplos:

* favoritos;
* filtros;
* busca;
* menus;
* formulários;
* seleção de dados;
* estados de loading;
* feedback de ações.

Evitar estados duplicados.

Evitar criar Context API apenas para resolver problemas pequenos.

Evitar estados globais sem necessidade.

---

# 6. Persistência

Quando uma informação precisar sobreviver ao refresh, utilizar o mecanismo de persistência apropriado já existente no projeto.

Para dados exclusivamente do usuário e sem necessidade de servidor:

* `localStorage` pode ser utilizado.

Para dados oficiais do sistema:

* eventos;
* grêmios;
* solicitações;
* usuários administrativos;
* informações públicas;

os dados devem permanecer no banco de dados utilizado pelo projeto.

Nunca utilizar `localStorage` como fonte oficial de dados administrativos.

---

# 7. Sistema de grêmios

O sistema de grêmios deve ser tratado como uma funcionalidade oficial do MaréLN.

A interface deve permitir apresentar informações de grêmios de forma clara.

O sistema deve manter a mesma identidade visual do portal.

Os componentes devem ser reutilizáveis sempre que possível.

Evitar criar uma interface completamente separada visualmente do restante do MaréLN.

### Informações

Não assumir campos que não sejam necessários.

Os campos devem ser definidos de acordo com o modelo de dados existente ou com a necessidade real da funcionalidade.

Informações públicas devem ser apresentadas de forma organizada.

Informações administrativas não devem aparecer para usuários comuns.

---

# 8. Página administrativa

A área administrativa deve ser visualmente diferente o suficiente para indicar que é uma área de gerenciamento, mas continuar pertencendo ao MaréLN.

A página deve priorizar:

* clareza;
* controle;
* leitura rápida;
* ações importantes;
* feedback das operações.

Evitar dashboards excessivamente complexos.

Não adicionar gráficos ou métricas que não tenham utilidade real.

### Administração

O administrador deve conseguir, conforme o escopo definido:

* visualizar eventos;
* revisar eventos enviados;
* aprovar eventos;
* rejeitar eventos;
* editar informações;
* remover eventos quando necessário;
* gerenciar informações dos grêmios.

Ações destrutivas devem exigir confirmação.

---

# 9. Acesso administrativo

O acesso administrativo é pré-configurado.

Nunca expor credenciais administrativas no código enviado ao navegador.

Nunca colocar:

* senha;
* token secreto;
* chave privada;
* credencial de banco;

em componentes Client, HTML ou código público.

Informações sensíveis devem permanecer no ambiente apropriado.

O frontend nunca deve ser considerado uma barreira de segurança.

Toda operação administrativa importante deve ser protegida também no lado do servidor.

---

# 10. Página de divulgação de evento

A página destinada a quem deseja divulgar um evento deve ser simples e objetiva.

O usuário deve entender rapidamente:

1. o que pode fazer;
2. quais informações precisa enviar;
3. como enviar;
4. o que acontece depois do envio.

O formulário deve evitar campos desnecessários.

Campos obrigatórios devem estar claramente identificados.

Erros devem aparecer próximos ao campo correspondente.

Mensagens de erro devem ser humanas e úteis.

Evitar mensagens técnicas como:

```text
Unexpected error
500 Internal Server Error
Invalid input
```

quando for possível apresentar uma explicação mais clara.

---

# 11. Fluxo de envio de eventos

O fluxo deve deixar claro que enviar um evento não significa necessariamente que ele será publicado imediatamente.

Quando houver aprovação administrativa, o usuário deve receber uma confirmação indicando que o evento foi enviado para análise.

Estados possíveis devem ser tratados corretamente:

* formulário vazio;
* preenchendo;
* enviando;
* sucesso;
* erro;
* evento aguardando aprovação;
* evento aprovado;
* evento rejeitado.

Nunca deixar o usuário sem feedback depois de clicar em uma ação.

---

# 12. Formulários

Formulários devem:

* possuir labels;
* possuir estados de foco;
* possuir estados de erro;
* possuir estados de carregamento;
* impedir submissões acidentais;
* preservar os dados digitados quando possível;
* funcionar corretamente em celular.

Botões de envio devem apresentar estado de carregamento durante operações assíncronas.

Exemplo:

```text
Enviar evento
```

durante o processamento:

```text
Enviando...
```

Evitar permitir múltiplos envios acidentais.

---

# 13. Feedback visual

Toda ação importante precisa de feedback.

Exemplos:

* salvar;
* favoritar;
* remover favorito;
* enviar evento;
* aprovar;
* rejeitar;
* excluir;
* atualizar.

O feedback deve ser discreto e consistente.

Não utilizar animações exageradas.

---

# 14. Loading

Toda página ou operação que possa demorar deve possuir estado de carregamento apropriado.

Preferir:

* skeleton;
* placeholder;
* estado de botão;
* mensagem contextual.

Evitar simplesmente mostrar uma tela branca.

O loading deve manter a estrutura visual próxima do conteúdo final.

---

# 15. Estados vazios

Toda lista importante precisa considerar o estado vazio.

Exemplos:

```text
Nenhum evento encontrado.
```

```text
Você ainda não possui eventos favoritos.
```

```text
Nenhum evento aguardando aprovação.
```

O estado vazio deve orientar o usuário para uma próxima ação quando houver uma ação útil.

---

# 16. Estados de erro

Erros devem ser tratados explicitamente.

O usuário nunca deve receber uma interface quebrada por causa de uma falha de API ou banco de dados.

Sempre que possível:

* informar o problema;
* permitir tentar novamente;
* manter o restante da interface funcionando.

Não exibir stack traces ou informações internas.

---

# 17. Responsividade

Mobile é prioridade.

Todas as páginas devem funcionar corretamente em:

* smartphones;
* tablets;
* notebooks;
* monitores maiores.

Particular atenção deve ser dada a:

* formulários;
* tabelas;
* menus;
* botões;
* cards;
* modais;
* área administrativa.

No mobile:

* evitar tabelas impossíveis de ler;
* evitar botões pequenos;
* evitar conteúdo horizontalmente cortado;
* evitar textos excessivamente grandes;
* manter espaçamento confortável.

---

# 18. Acessibilidade

Todos os elementos interativos devem ser utilizáveis por teclado.

Botões devem ser `<button>`.

Links devem ser `<Link>` ou `<a>` quando apropriado.

Não utilizar uma `div` como botão.

Inputs devem possuir labels.

Imagens devem possuir `alt` adequado.

Contraste deve permanecer legível.

Foco de teclado não deve ser removido sem motivo.

---

# 19. SEO

Páginas públicas devem possuir metadata adequada.

Sempre que apropriado:

* `title`;
* `description`;
* Open Graph;
* informações relevantes para compartilhamento.

As páginas públicas devem possuir títulos claros e específicos.

Não duplicar indiscriminadamente o mesmo metadata em todas as páginas.

---

# 20. Compartilhamento

Como o MaréLN é um portal público, páginas de eventos devem ser preparadas para compartilhamento.

Ao compartilhar um evento, o usuário deve receber uma apresentação clara do conteúdo.

O título e descrição devem representar o evento.

Não expor informações administrativas no conteúdo compartilhável.

---

# 21. Segurança

O sistema deve seguir o princípio:

> Nunca confiar no cliente.

Validações no frontend melhoram UX, mas não substituem validação no servidor.

Toda entrada enviada pelo usuário deve ser validada no servidor antes de ser persistida.

Nunca confiar em:

* IDs enviados pelo navegador;
* permissões enviadas pelo navegador;
* campos como `isAdmin`;
* campos como `approved`;
* dados de formulário;
* parâmetros de URL.

A autorização deve ser verificada no lado do servidor.

---

# 22. Dados enviados por usuários

Conteúdo enviado por organizadores deve ser considerado não confiável.

Não renderizar HTML arbitrário enviado pelo usuário.

Evitar inserir conteúdo diretamente com mecanismos que permitam XSS.

Textos de usuários devem ser tratados como texto, salvo quando houver sanitização apropriada.

---

# 23. Banco de dados

Não duplicar dados desnecessariamente.

Utilizar relacionamentos apropriados.

IDs devem ser consistentes.

Campos obrigatórios devem possuir validação.

Operações administrativas devem possuir regras claras.

Não fazer consultas desnecessárias.

Evitar buscar dados que a página não utiliza.

---

# 24. Performance

O MaréLN deve continuar leve.

Priorizar:

* Server Components;
* carregamento apenas do JavaScript necessário;
* imagens otimizadas;
* componentes pequenos;
* consultas eficientes;
* ausência de dependências desnecessárias.

Não transformar componentes estáticos em Client Components sem necessidade.

---

# 25. Animações

Animações devem ser:

* rápidas;
* suaves;
* discretas;
* funcionais.

Não utilizar animações para todas as mudanças de estado.

Priorizar transições simples de:

* opacity;
* transform;
* background;
* border;
* scale.

Evitar interfaces que pareçam travadas ou que façam vários elementos entrarem em sequência sem necessidade.

---

# 26. Componentização

Criar componentes quando houver:

* reutilização;
* lógica própria;
* responsabilidade clara;
* necessidade de isolamento.

Não criar dezenas de componentes minúsculos apenas para fragmentar o código.

Componentes devem possuir responsabilidades claras.

---

# 27. Código TypeScript

Evitar `any`.

Tipos devem representar os dados reais.

Interfaces e types devem ser reutilizados quando fizer sentido.

Evitar casts desnecessários.

Não esconder erros de TypeScript utilizando:

```ts
as any
```

ou equivalentes apenas para fazer o build passar.

---

# 28. Tratamento de erros

Erros devem ser tratados na camada correta.

Não utilizar:

```ts
try {
  ...
} catch {
}
```

sem motivo.

Erros importantes devem ser tratados ou propagados corretamente.

Nunca esconder silenciosamente uma falha importante.

---

# 29. Não quebrar funcionalidades existentes

Antes de alterar uma funcionalidade existente:

1. entender como ela funciona;
2. identificar seus componentes;
3. preservar seu comportamento;
4. alterar apenas o necessário;
5. testar novamente.

Não reescrever partes estáveis do projeto apenas por preferência pessoal.

---

# 30. Design incremental

Novas páginas devem parecer uma evolução natural das páginas atuais.

Não substituir todo o design existente.

Não trocar:

* paleta;
* tipografia;
* componentes;
* espaçamentos;
* estilo de cards;

sem uma necessidade concreta.

A prioridade é:

> melhorar o produto sem fazer o usuário sentir que entrou em outro site.

---

# 31. Navegação

Todas as novas páginas devem possuir navegação clara.

O usuário nunca deve ficar preso em uma página.

Páginas administrativas devem possuir maneira clara de voltar ou navegar entre seções.

Formulários devem permitir cancelar ou retornar quando apropriado.

---

# 32. Confirmações

Ações potencialmente destrutivas precisam de confirmação.

Exemplos:

* excluir evento;
* rejeitar evento;
* remover grêmio;
* remover informação importante.

A confirmação deve explicar claramente o que acontecerá.

Evitar confirmações desnecessárias para ações reversíveis ou simples.

---

# 33. Feedback de sucesso

Mensagens de sucesso devem ser objetivas.

Exemplo:

```text
Evento enviado com sucesso.

Seu evento foi encaminhado para análise.
```

Não utilizar mensagens vagas como:

```text
Tudo certo!
```

quando o usuário precisa saber exatamente o que aconteceu.

---

# 34. Produção

O projeto deve ser tratado como uma aplicação que será utilizada por pessoas reais.

Antes de considerar uma funcionalidade concluída, verificar:

* desktop;
* mobile;
* estados de loading;
* estado vazio;
* erros;
* formulários;
* navegação;
* permissões;
* persistência;
* atualização da interface;
* build;
* TypeScript;
* console do navegador.

---

# 35. Regra de simplicidade

Quando houver duas soluções tecnicamente válidas:

> escolher a solução mais simples que atende corretamente ao problema.

Não implementar arquitetura de grande escala para resolver problemas pequenos.

O código deve ser compreensível por um desenvolvedor júnior que precise manter o projeto posteriormente.

---

# 36. Regra de alteração mínima

Antes de adicionar código novo, verificar se já existe:

* componente reutilizável;
* função existente;
* estilo existente;
* tipo existente;
* utilitário existente;
* estrutura de dados existente.

Reutilizar antes de duplicar.

---

# 37. Critério de conclusão

Uma funcionalidade somente deve ser considerada concluída quando:

* funciona;
* está visualmente integrada ao MaréLN;
* funciona no mobile;
* possui loading quando necessário;
* possui estados vazios quando necessário;
* possui tratamento de erro;
* não expõe informações sensíveis;
* não quebra funcionalidades existentes;
* não gera erros no console;
* passa pelo build;
* possui comportamento consistente.

---

# 38. Regra final

Não implementar funcionalidades além do que foi solicitado.

Não criar:

* sistemas de usuários completos;
* dashboards complexos;
* notificações;
* pagamentos;
* chat;
* analytics;
* sistemas de recomendação;
* novas bibliotecas;

sem solicitação explícita.

O objetivo é construir um MaréLN funcional, profissional e sustentável, mantendo o escopo sob controle.
