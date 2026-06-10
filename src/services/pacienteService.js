import { api } from './api';

export async function getPacientes() {
  const response = await api.get('/pacientes');
  return response.data;
}
