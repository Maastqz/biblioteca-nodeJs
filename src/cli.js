#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';

const caminho = process.argv;

function imprimeLista(resultado, identificador = '') {
    console.log(
      chalk.yellow('link na lista'),
      chalk.black.bgGreen(identificador), 
      resultado);
  }

async function processaTexto(argumentos) {
  const caminho = argumentos[2];

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log('arquivo ou diretório não existem');
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await PegaArquivo(argumentos[2]);
    imprimeLista(resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho)
    arquivos.forEach(async (nomeDoArquivo) => {
      const lista = await PegaArquivo(`${caminho}/${nomeDoArquivo}`)
      imprimeLista(lista, nomeDoArquivo)
    })
  }
}

processaTexto(caminho);