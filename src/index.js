import fs from 'fs';
import chalk from 'chalk';

function ExtraiLink(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
  return resultados.length !== 0 ? resultados : 'não existem links no arquivo';
}

function TrataErro(erro) {
  console.log(erro);
  throw new Error(chalk.red(erro.code, 'não existem arquivos no diretório'));
}

// async/await

async function PegaArquivo(caminhoArquivo) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoArquivo, encoding)
    return ExtraiLink(texto);
  } catch (erro) {
    TrataErro(erro)
  }
}

export default PegaArquivo;

module.exports = {
  ExtraiLink,
  TrataErro,
  PegaArquivo
}