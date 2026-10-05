'use strict';

// Posição inicial do estoque, conforme o enunciado.
const dados = {
  estoque: [
    { codigoProduto: 101, descricaoProduto: 'Caneta Azul', estoque: 150 },
    { codigoProduto: 102, descricaoProduto: 'Caderno Universitário', estoque: 75 },
    { codigoProduto: 103, descricaoProduto: 'Borracha Branca', estoque: 200 },
    { codigoProduto: 104, descricaoProduto: 'Lápis Preto HB', estoque: 320 },
    { codigoProduto: 105, descricaoProduto: 'Marcador de Texto Amarelo', estoque: 90 }
  ]
};

function criarControleEstoque(produtos) {
  if (!Array.isArray(produtos)) throw new TypeError('Os produtos devem ser um array.');
  const estoque = new Map();
  for (const produto of produtos) {
    if (!produto || !Number.isSafeInteger(produto.codigoProduto) ||
        typeof produto.descricaoProduto !== 'string' || !produto.descricaoProduto.trim() ||
        !Number.isSafeInteger(produto.estoque) || produto.estoque < 0) {
      throw new TypeError('Cada produto deve ter código inteiro, descrição e estoque inteiro não negativo.');
    }
    if (estoque.has(produto.codigoProduto)) throw new Error('Código de produto duplicado: ' + produto.codigoProduto + '.');
    estoque.set(produto.codigoProduto, { ...produto });
  }

  const idsUsados = new Set();
  const movimentacoes = [];

  function movimentar({ id, codigoProduto, tipo, quantidade, descricao }) {
    if ((typeof id !== 'string' && typeof id !== 'number') || String(id).trim() === '') {
      throw new TypeError('A movimentação precisa de um identificador único.');
    }
    const idNormalizado = String(id);
    if (idsUsados.has(idNormalizado)) throw new Error('Identificador de movimentação repetido: ' + id + '.');
    if (!Number.isSafeInteger(codigoProduto) || !estoque.has(codigoProduto)) {
      throw new Error('Produto não encontrado: ' + codigoProduto + '.');
    }
    if (tipo !== 'entrada' && tipo !== 'saida') throw new Error('O tipo deve ser entrada ou saida.');
    if (!Number.isSafeInteger(quantidade) || quantidade <= 0) {
      throw new TypeError('A quantidade deve ser um inteiro positivo.');
    }
    if (typeof descricao !== 'string' || !descricao.trim()) {
      throw new TypeError('A movimentação precisa de uma descrição.');
    }

    const produto = estoque.get(codigoProduto);
    const estoqueFinal = produto.estoque + (tipo === 'entrada' ? quantidade : -quantidade);
    if (estoqueFinal < 0) throw new Error('Estoque insuficiente para essa saída.');

    produto.estoque = estoqueFinal;
    idsUsados.add(idNormalizado);
    const resultado = {
      id, codigoProduto, descricaoProduto: produto.descricaoProduto,
      tipo, descricao: descricao.trim(), quantidade, estoqueFinal
    };
    movimentacoes.push(resultado);
    return { ...resultado };
  }

  return {
    movimentar,
    consultarEstoque(codigoProduto) {
      const produto = estoque.get(codigoProduto);
      if (!produto) throw new Error('Produto não encontrado: ' + codigoProduto + '.');
      return { ...produto };
    },
    listarMovimentacoes() { return movimentacoes.map((movimento) => ({ ...movimento })); }
  };
}

if (require.main === module) {
  const controle = criarControleEstoque(dados.estoque);
  console.log(controle.movimentar({
    id: 1, codigoProduto: 101, tipo: 'entrada', quantidade: 20,
    descricao: 'Reposição de mercadoria'
  }));
  console.log(controle.movimentar({
    id: 2, codigoProduto: 101, tipo: 'saida', quantidade: 5,
    descricao: 'Venda ao cliente'
  }));
}

module.exports = { dados, criarControleEstoque };
