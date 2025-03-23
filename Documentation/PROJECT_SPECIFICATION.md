## Especificação do Sistema de Controle de Estoque

O time está desenvolvendo um sistema de controle de estoque. Você será responsável por implementar o código inicial do backend e frontend, além de definir as práticas de arquitetura de software que serão utilizadas pelo time no longo prazo.

**Requisitos Técnicos:**

- **Backend:**
  - Desenvolvido utilizando .NET 6 ou superior.
- **Frontend:**
  - Aplicação SPA (Single Page Application) desenvolvida em React, Angular ou Vue.
- **Utilização de IA:**
  - Permitido o uso de IA para bootstrap do código.
  - Avaliação da organização do projeto, decisões técnicas, arquitetura de código e capacidade de expansão da arquitetura.
- **Testes Automatizados:**
  - Adicionar testes automatizados (unitários ou de integração).
- **Entrega:**
  - Repositório público no GitHub.
- **Prazo:**
  - 3 dias corridos.

**Esquema de Dados:**

- **Produto:**
  - Nome: string, obrigatório.
  - Código: string, obrigatório, único.
- **Movimentação:**
  - Produto: referência para Produto, obrigatório.
  - Tipo: opções válidas: Entrada | Saída, obrigatório.
  - Criado Em: data e hora, obrigatório.
  - Quantidade: inteiro, obrigatório.

**Considerações:**

- Endpoints e interfaces de cadastro de produtos fora do escopo.
- Script para inserção de produtos na base de dados para testes (opcional).
- Persistência das movimentações em base de dados.

**Funcionalidades:**

1.  **Cadastro de Movimentação de Estoque:**
    - Implementar endpoints e interface para inserção de movimentação de estoque.
    - Considerar tabela de produtos populada.
    - Impedir movimentação que resulte em estoque negativo.
    - Validar existência do código do produto e apresentar mensagem apropriada.
    - Campos da tela de cadastro:
      - Código do produto: string, obrigatório.
      - Tipo: entrada, saída.
      - Quantidade: inteiro, obrigatório.
    - Não é necessário implementar tela de listagem de movimentações.
2.  **Relatório de Estoque:**
    - Implementar endpoints e interface para relatório de estoque em data específica.
    - Filtros:
      - Data da movimentação: somente data, obrigatória.
      - Código do produto: string, opcional.
    - Retorno do relatório:
      - Nome do produto.
      - Código do produto.
      - Entradas.
      - Saídas.
      - Saldo.

**Entrega:**

- Disponibilizar o projeto em um repositório público no GitHub e enviar o link.
