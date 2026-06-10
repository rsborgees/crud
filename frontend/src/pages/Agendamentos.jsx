import { useEffect, useState } from 'react';
import { getAgendamentos, createAgendamento, deleteAgendamento } from '../services/agendamentoService';
import { getMedicos } from '../services/medicoService';
import { getPacientes } from '../services/pacienteService';
import AgendamentoCard from '../components/AgendamentoCard';

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ paciente_id: '', medico_id: '', data: '', horario: '' });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [agendaList, medicosList, pacientesList] = await Promise.all([
        getAgendamentos(),
        getMedicos(),
        getPacientes(),
      ]);
      setAgendamentos(agendaList || []);
      setMedicos(medicosList || []);
      setPacientes(pacientesList || []);
    } catch {
      setAgendamentos([]);
      setMedicos([]);
      setPacientes([]);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      await createAgendamento(form);
      setMessage('Agendamento cadastrado com sucesso.');
      setForm({ paciente_id: '', medico_id: '', data: '', horario: '' });
      await loadData();
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Não foi possível salvar o agendamento.');
    } finally {
      setSaving(false);
    }
  };

  const getPacienteName = (id) => pacientes.find((p) => p.id === Number(id))?.nome || 'Paciente não encontrado';
  const getMedicoName = (id) => medicos.find((m) => m.id === Number(id))?.nome || 'Médico não encontrado';

  return (
    <section>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Agendamentos</h1>
          <p className="page-description">Cadastre e visualize os agendamentos da clínica.</p>
        </div>
      </div>
      <div className="section-grid">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2 className="form-title">Novo agendamento</h2>
          <div className="form-grid">
            <label>
              Paciente
              <select name="paciente_id" value={form.paciente_id} onChange={handleChange} required>
                <option value="">Selecione um paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nome}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Médico
              <select name="medico_id" value={form.medico_id} onChange={handleChange} required>
                <option value="">Selecione um médico</option>
                {medicos.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nome}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Data da consulta
              <input name="data" type="date" value={form.data} onChange={handleChange} required />
            </label>
            <label>
              Horário
              <input name="horario" type="time" value={form.horario} onChange={handleChange} required />
            </label>
          </div>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          <button className="button-primary" type="submit" disabled={saving || loading}>
            {saving ? 'Salvando...' : 'Salvar agendamento'}
          </button>
        </form>

        <div className="card list-card">
          <h2 className="form-title">Agendamentos recentes</h2>
          {loading ? (
            <div className="empty-state">Carregando agendamentos...</div>
          ) : agendamentos.length === 0 ? (
            <div className="empty-state">Nenhum agendamento encontrado.</div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Paciente</th>
                    <th>Médico</th>
                    <th>Data</th>
                    <th>Horário</th>
                  </tr>
                </thead>
                <tbody>
                  {agendamentos.map((agendamento) => (
                    <tr key={agendamento.id}>
                          <td>{agendamento.id}</td>
                          <td>{getPacienteName(agendamento.paciente_id)}</td>
                          <td>{getMedicoName(agendamento.medico_id)}</td>
                          <td>{agendamento.data}</td>
                          <td>{agendamento.horario}</td>
                          <td>
                            <button
                              className="button-secondary"
                              onClick={async () => {
                                if (confirm('Cancelar este agendamento?')) {
                                  await deleteAgendamento(agendamento.id);
                                  await loadData();
                                }
                              }}
                            >
                              Cancelar
                            </button>
                            <button
                              className="button-primary"
                              style={{ marginLeft: 8 }}
                              onClick={async () => {
                                if (confirm('Marcar como concluído? (removerá o agendamento)')) {
                                  await deleteAgendamento(agendamento.id);
                                  await loadData();
                                }
                              }}
                            >
                              Concluir
                            </button>
                          </td>
                        </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
