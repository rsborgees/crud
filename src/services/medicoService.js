import { api } from './api';

export async function getMedicos() {
  const response = await api.get('/medicos');
  return response.data;
}
