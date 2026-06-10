import { api } from './api';

export async function getPacientes() {
  const response = await api.get('/pacientes');
  return response.data;
}

export async function createPaciente(paciente) {
  const response = await api.post('/pacientes', paciente);
  return response.data;
}

export async function deletePaciente(id) {
  const response = await api.delete(`/pacientes/${id}`);
  return response.data;
}
