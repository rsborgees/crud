import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAgendamento } from '../services/agendamentoService';

export default function AddAgendamento() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ paciente: '', medico: '', data: '', servico: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      await createAgendamento(form);
      navigate('/agendamentos');
    } catch (err) {
      setError('Não foi possível salvar o agendamento.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h1 className="page-title">Adicionar agendamento</h1>
      <p className="page-description">Preencha os dados para criar um novo agendamento.</p>
      <form className="card" onSubmit={handleSubmit}>
        <label>
          Paciente
          <input name="paciente" value={form.paciente} onChange={handleChange} required />
        </label>
        <label>
          Médico
          <input name="medico" value={form.medico} onChange={handleChange} required />
        </label>
        <label>
          Data
          <input name="data" type="datetime-local" value={form.data} onChange={handleChange} required />
        </label>
        <label>
          Serviço
          <input name="servico" value={form.servico} onChange={handleChange} required />
        </label>
        {error && <div className="error-message">{error}</div>}
        <button className="button-primary" type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar agendamento'}
        </button>
      </form>
    </section>
  );
}
