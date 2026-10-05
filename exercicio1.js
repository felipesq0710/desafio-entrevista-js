'use strict';

// Dados transcritos do enunciado.
const dados = {
  vendas: [
    { vendedor: 'João Silva', valor: 1200.50 },
    { vendedor: 'João Silva', valor: 950.75 },
    { vendedor: 'João Silva', valor: 1800.00 },
    { vendedor: 'João Silva', valor: 1400.30 },
    { vendedor: 'João Silva', valor: 1100.90 },
    { vendedor: 'João Silva', valor: 1550.00 },
    { vendedor: 'João Silva', valor: 1700.80 },
    { vendedor: 'João Silva', valor: 250.30 },
    { vendedor: 'João Silva', valor: 480.75 },
    { vendedor: 'João Silva', valor: 320.40 },
    { vendedor: 'Maria Souza', valor: 2100.40 },
    { vendedor: 'Maria Souza', valor: 1350.60 },
    { vendedor: 'Maria Souza', valor: 950.20 },
    { vendedor: 'Maria Souza', valor: 1600.75 },
    { vendedor: 'Maria Souza', valor: 1750.00 },
    { vendedor: 'Maria Souza', valor: 1450.90 },
    { vendedor: 'Maria Souza', valor: 400.50 },
    { vendedor: 'Maria Souza', valor: 180.20 },
    { vendedor: 'Maria Souza', valor: 90.75 },
    { vendedor: 'Carlos Oliveira', valor: 800.50 },
    { vendedor: 'Carlos Oliveira', valor: 1200.00 },
    { vendedor: 'Carlos Oliveira', valor: 1950.30 },
    { vendedor: 'Carlos Oliveira', valor: 1750.80 },
    { vendedor: 'Carlos Oliveira', valor: 1300.60 },
    { vendedor: 'Carlos Oliveira', valor: 300.40 },
    { vendedor: 'Carlos Oliveira', valor: 500.00 },
    { vendedor: 'Carlos Oliveira', valor: 125.75 },
    { vendedor: 'Ana Lima', valor: 1000.00 },
    { vendedor: 'Ana Lima', valor: 1100.50 },
    { vendedor: 'Ana Lima', valor: 1250.75 },
    { vendedor: 'Ana Lima', valor: 1400.20 },
    { vendedor: 'Ana Lima', valor: 1550.90 },
    { vendedor: 'Ana Lima', valor: 1650.00 },
    { vendedor: 'Ana Lima', valor: 75.30 },
    { vendedor: 'Ana Lima', valor: 420.90 },
    { vendedor: 'Ana Lima', valor: 315.40 }
  ]
};

function validarVendas(vendas) {
  if (!Array.isArray(vendas)) throw new TypeError('As vendas devem ser um array.');
  vendas.forEach((venda, indice) => {
    if (!venda || typeof venda.vendedor !== 'string' || !venda.vendedor.trim()) {
      throw new TypeError(`Venda ${indice + 1}: vendedor inválido.`);
    }
    if (typeof venda.valor !== 'number' || !Number.isFinite(venda.valor) || venda.valor < 0) {
      throw new TypeError(`Venda ${indice + 1}: valor deve ser um número não negativo.`);
    }
  });
}

function calcularComissoes(vendas) {
  validarVendas(vendas);
  return vendas.reduce((totais, venda) => {
    const taxa = venda.valor < 100 ? 0 : venda.valor < 500 ? 0.01 : 0.05;
    const comissao = Math.round((venda.valor * taxa + Number.EPSILON) * 100) / 100;
    totais[venda.vendedor] = (totais[venda.vendedor] || 0) + comissao;
    return totais;
  }, {});
}

if (require.main === module) {
  console.log('Comissão total por vendedor:');
  for (const [vendedor, total] of Object.entries(calcularComissoes(dados.vendas))) {
    console.log(`${vendedor}: R$ ${total.toFixed(2)}`);
  }
}

module.exports = { dados, calcularComissoes };
