import { api } from './api';

export async function getAgendamentos() {
  const response = await api.get('/agendamentos');
  return response.data;
}

export async function createAgendamento(agendamento) {
  const response = await api.post('/agendamentos', agendamento);
  return response.data;
}

export async function deleteAgendamento(id) {
  const response = await api.delete(`/agendamentos/${id}`);
  return response.data;
}
