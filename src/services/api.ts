import axios from 'axios';

export const api = axios.create({
  // quando for rodar o servidor precisa definir o ip da máquina(NÃO PODE SER LOCALHOST)
  // OBS: ISSO SÓ NO AMBIENTE DE DESENVOLVIMENTO
  baseURL: process.env.API_BASE_URL,
});