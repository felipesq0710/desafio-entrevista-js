# Desafio de entrevista

Soluções dos três exercícios em JavaScript puro. Requer Node.js 18 ou superior e não usa dependências externas.

## Como executar

```bash
node exercicio1.js
node exercicio2.js
node exercicio3.js
```

## Exercício 1 — Comissão de vendas

O programa usa os dados do enunciado e mostra a comissão total de cada vendedor. Vendas abaixo de R$ 100,00 não têm comissão; de R$ 100,00 até abaixo de R$ 500,00 pagam 1%; a partir de R$ 500,00, 5%. Cada comissão é arredondada para centavos.

## Exercício 2 — Estoque

O programa começa com os cinco produtos e saldos do enunciado. `criarControleEstoque` permite registrar entradas e saídas com identificador, descrição, produto e quantidade. A função retorna o saldo após cada movimentação. O estoque fica em memória durante a execução.

## Exercício 3 — Juros por atraso

`calcularJuros(valorOriginal, dataVencimento, dataReferencia)` recebe datas no formato `YYYY-MM-DD`. A data de referência é opcional e, por padrão, usa o dia atual.

Considerei 2,5% ao dia como juros simples sobre o valor original, para cada dia de atraso. Se o vencimento ainda não passou, os juros são zero.
