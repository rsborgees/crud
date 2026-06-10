import { api } from './api';

export async function getAgendamentos() {
  const response = await api.get('/agendamentos');
  return response.data;
}
