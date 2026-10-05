# Desafio de entrevista — JavaScript

Soluções dos três exercícios do arquivo `desafio_dev.docx`, implementadas em JavaScript puro, sem dependências externas. Cada exercício pode ser executado separadamente com Node.js.

## Requisitos

- Node.js 18 ou superior
- Nenhuma biblioteca ou instalação adicional

## Como executar

Abra o terminal nesta pasta e rode:

```bash
node exercicio1.js
node exercicio2.js
node exercicio3.js
```

Os dois primeiros programas imprimem resultados com os dados e operações de exemplo. No terceiro, altere o valor e a data de vencimento no final de `exercicio3.js` para informar a cobrança desejada. A data de referência é hoje por padrão e também pode ser informada como terceiro argumento.

## Exercício 1 — Comissão de vendas

O arquivo contém os 36 registros de venda apresentados no enunciado e soma a comissão por vendedor. A regra aplicada a cada venda é:

- Abaixo de R$ 100,00: sem comissão.
- De R$ 100,00 até abaixo de R$ 500,00: 1%.
- A partir de R$ 500,00: 5%.

A comissão de cada venda é arredondada para centavos antes de ser somada. Valores não numéricos, negativos ou vendedores sem nome são rejeitados.

## Exercício 2 — Movimentação de estoque

O arquivo inicia com os cinco produtos e quantidades do enunciado. `criarControleEstoque(produtos)` cria um controle em memória e oferece:

- `movimentar({ id, codigoProduto, tipo, quantidade, descricao })`: registra uma `entrada` ou `saida` e retorna a quantidade final daquele produto.
- `consultarEstoque(codigoProduto)`: consulta a posição atual.
- `listarMovimentacoes()`: lista as movimentações desta execução.

O identificador não pode se repetir durante a vida do controle. A quantidade deve ser um inteiro positivo; produto inexistente, descrição vazia, tipo inválido e saída maior que o saldo geram erro. Os dados ficam em memória e voltam aos valores iniciais ao iniciar o programa novamente, já que o enunciado não pede persistência em arquivo ou banco de dados.

## Exercício 3 — Juros por atraso

`calcularJuros(valorOriginal, dataVencimento, dataReferencia)` recebe valor numérico e datas no formato `YYYY-MM-DD`. A data de referência é opcional e, quando omitida, usa a data de hoje.

Interpretação adotada: **2,5% ao dia como juros simples, calculados sobre o valor original por dia de atraso**. Assim, juros = valor original × 0,025 × dias de atraso. Atrasos são contados por dias civis completos; vencimento hoje ou no futuro resulta em zero dia de atraso. A função retorna os dias, juros e total, arredondados para centavos.

## Uso como módulo

Cada arquivo exporta suas funções para reutilização em outro arquivo JavaScript. Por exemplo:

```js
const { calcularJuros } = require('./exercicio3');
console.log(calcularJuros(250, '2026-09-30', '2026-10-05'));
```

## Estrutura

```text
exercicio1.js
exercicio2.js
exercicio3.js
README.md
```
