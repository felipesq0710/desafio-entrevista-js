'use strict';

const TAXA_DIARIA = 0.025;
const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

// Aceita datas civis no formato ISO YYYY-MM-DD, sem dependência do fuso horário.
function converterDataISO(data) {
  if (typeof data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    throw new TypeError('A data deve estar no formato YYYY-MM-DD.');
  }
  const [ano, mes, dia] = data.split('-').map(Number);
  const dataUTC = new Date(Date.UTC(ano, mes - 1, dia));
  if (dataUTC.getUTCFullYear() !== ano || dataUTC.getUTCMonth() !== mes - 1 || dataUTC.getUTCDate() !== dia) {
    throw new RangeError('A data informada não é válida.');
  }
  return dataUTC;
}

function calcularJuros(valorOriginal, dataVencimento, dataReferencia = new Date().toISOString().slice(0, 10)) {
  if (typeof valorOriginal !== 'number' || !Number.isFinite(valorOriginal) || valorOriginal < 0) {
    throw new TypeError('O valor original deve ser um número não negativo.');
  }
  const vencimento = converterDataISO(dataVencimento);
  const referencia = converterDataISO(dataReferencia);
  const diasAtraso = Math.max(0, Math.floor((referencia - vencimento) / MILISSEGUNDOS_POR_DIA));
  // Interpretação: 2,5% ao dia, calculados sobre o valor original (juros simples).
  const juros = Math.round((valorOriginal * TAXA_DIARIA * diasAtraso + Number.EPSILON) * 100) / 100;
  const valorTotal = Math.round((valorOriginal + juros + Number.EPSILON) * 100) / 100;
  return { valorOriginal, dataVencimento, dataReferencia, diasAtraso, taxaDiaria: TAXA_DIARIA, juros, valorTotal };
}

if (require.main === module) {
  // Edite estes valores para calcular outra cobrança.
  const resultado = calcularJuros(100, '2026-10-01');
  console.log('Dias de atraso: ' + resultado.diasAtraso);
  console.log('Juros: R$ ' + resultado.juros.toFixed(2));
  console.log('Valor total: R$ ' + resultado.valorTotal.toFixed(2));
}

module.exports = { calcularJuros };
