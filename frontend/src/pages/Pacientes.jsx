import { useEffect, useState } from 'react';
import { getPacientes, createPaciente, deletePaciente } from '../services/pacienteService';
import PacienteCard from '../components/PacienteCard';

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', data_nascimento: '' });

  useEffect(() => {
    loadPacientes();
  }, []);

  async function loadPacientes() {
    setLoading(true);
    try {
      const data = await getPacientes();
      setPacientes(data || []);
    } catch {
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
      await createPaciente(form);
      setMessage('Paciente cadastrado com sucesso.');
      setForm({ nome: '', telefone: '' });
      await loadPacientes();
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Não foi possível salvar o paciente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Pacientes</h1>
          <p className="page-description">Cadastro e lista de pacientes do sistema.</p>
        </div>
      </div>
      <div className="section-grid">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2 className="form-title">Adicionar paciente</h2>
          <div className="form-grid">
            <label>
              Nome
              <input name="nome" value={form.nome} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Telefone
              <input name="telefone" value={form.telefone} onChange={handleChange} required />
            </label>
            <label>
              Data de nascimento
              <input name="data_nascimento" type="date" value={form.data_nascimento} onChange={handleChange} />
            </label>
          </div>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          <button className="button-primary" type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar paciente'}
          </button>
        </form>

        <div className="card list-card">
          <h2 className="form-title">Lista de pacientes</h2>
          {loading ? (
            <div className="empty-state">Carregando pacientes...</div>
          ) : pacientes.length === 0 ? (
            <div className="empty-state">Nenhum paciente encontrado.</div>
          ) : (
            <div className="card-grid">
              {pacientes.map((paciente) => (
                <PacienteCard
                  key={paciente.id}
                  paciente={paciente}
                  onDelete={async (id) => {
                    await deletePaciente(id);
                    await loadPacientes();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
