import { useEffect, useState } from 'react';
import { getMedicos, createMedico, deleteMedico } from '../services/medicoService';
import MedicoCard from '../components/MedicoCard';

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nome: '', especialidade: '', telefone: '' });

  useEffect(() => {
    loadMedicos();
  }, []);

  async function loadMedicos() {
    setLoading(true);
    try {
      const data = await getMedicos();
      setMedicos(data || []);
    } catch {
      setMedicos([]);
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
      await createMedico(form);
      setMessage('Médico cadastrado com sucesso.');
      setForm({ nome: '', especialidade: '', telefone: '' });
      await loadMedicos();
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Não foi possível salvar o médico.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Médicos</h1>
          <p className="page-description">Cadastro e lista de médicos do sistema.</p>
        </div>
      </div>
      <div className="section-grid">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2 className="form-title">Adicionar médico</h2>
          <div className="form-grid">
            <label>
              Nome
              <input name="nome" value={form.nome} onChange={handleChange} required />
            </label>
            <label>
              Especialidade
              <input name="especialidade" value={form.especialidade} onChange={handleChange} required />
            </label>
            <label>
              Telefone
              <input name="telefone" value={form.telefone} onChange={handleChange} required />
            </label>
          </div>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          <button className="button-primary" type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar médico'}
          </button>
        </form>

        <div className="card list-card">
          <h2 className="form-title">Lista de médicos</h2>
          {loading ? (
            <div className="empty-state">Carregando médicos...</div>
          ) : medicos.length === 0 ? (
            <div className="empty-state">Nenhum médico encontrado.</div>
          ) : (
            <div className="card-grid">
              {medicos.map((medico) => (
                <MedicoCard
                  key={medico.id}
                  medico={medico}
                  onDelete={async (id) => {
                    await deleteMedico(id);
                    await loadMedicos();
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
