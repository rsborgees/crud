import { api } from './api';

export async function getMedicos() {
  const response = await api.get('/medicos');
  return response.data;
}

export async function createMedico(medico) {
  const response = await api.post('/medicos', medico);
  return response.data;
}

export async function deleteMedico(id) {
  const response = await api.delete(`/medicos/${id}`);
  return response.data;
}
