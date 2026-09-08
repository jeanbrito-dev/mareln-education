Bloco 1: Estrutura e Setup Base (Semana 1)

* [x] 1: O projeto foi inicializado corretamente via terminal (Next.js/React) sem erros de dependência?
* [x] 2: O arquivo de dados mockados (dados.ts ou equivalente) está preenchido com eventos reais ou simulados do Litoral Norte (ex: shows, festivais, feiras)?
* [x] 3: O layout unificado (Header, Footer e estrutura base) está presente e aplicado em todas as páginas?
* [x] 4: A estilização responsiva utiliza corretamente os grids e flexbox do Tailwind CSS?
* [x] 5: O site se adapta bem visualmente tanto em telas mobile quanto em desktops (testado via DevTools)?

Bloco 2: Roteamento Dinâmico e Integração Social (Semana 2)

* [x] 6: Existe a estrutura de diretórios com colchetes (ex: app/evento/[id]/page.tsx ou similar) para páginas individuais?
* [x] 7: A página do evento lê corretamente o parâmetro da URL (id ou slug) para exibir as informações do evento específico?
* [x] 8: A navegação entre a página inicial e os detalhes dos eventos utiliza o componente Link do framework, evitando o recarregamento total da página?
* [x] 9: Há integração com links de envio rápido, como um botão para tirar dúvidas ou garantir presença via WhatsApp? (formulário de contato implementado em /contato)
* [x] 10: Os links externos e de redes sociais abrem corretamente (ex: target="_blank" com segurança)?

Bloco 3: Interatividade e Persistência (Semana 3)

* [x] 11: A diretiva "use client" está declarada apenas nos componentes que realmente exigem interatividade (como botões de salvos/favoritos)?
* [x] 12: O gerenciamento de estados (useState) funciona perfeitamente (ex: lista de eventos salvos, filtros por cidade do litoral, busca)?
* [x] 13: O uso de efeitos colaterais (useEffect) lida corretamente com a montagem de componentes e carregamento inicial?
* [x] 14: A persistência de dados local (localStorage) está ativa (ex: se o usuário marcar um evento como favorito, ele continua salvo ao atualizar a página)?
* [x] 15: A interface reage de forma fluida a essas mudanças de estado sem travamentos?

Bloco 4: UX, SEO e Deploy (Semana 3)

* [x] 16: Os metadados da aplicação (Title, Description, Open Graph para WhatsApp/Redes Sociais) estão configurados para exibir Mareln e descrições atraentes dos eventos?
* [x] 17: Existem arquivos de feedback visual implementados, como o loading.tsx ou estados de carregamento elegantes?
* [ ] 18: O site foi publicado com sucesso em uma plataforma de nuvem (ex: Vercel) e possui uma URL pública funcional?
* [ ] 19: O deploy na Vercel está sincronizado e atualizado com o repositório de código?
* [ ] 20: O site foi testado rodando direto no smartphone via link público, validando o comportamento real em