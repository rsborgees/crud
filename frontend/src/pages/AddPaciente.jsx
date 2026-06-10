import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPaciente } from '../services/pacienteService';

export default function AddPaciente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', data_nascimento: '' });
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
      await createPaciente(form);
      navigate('/pacientes');
    } catch (err) {
      setError('Não foi possível salvar o paciente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h1 className="page-title">Adicionar paciente</h1>
      <p className="page-description">Preencha os dados para criar um novo paciente.</p>
      <form className="card" onSubmit={handleSubmit}>
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
        {error && <div className="error-message">{error}</div>}
        <button className="button-primary" type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar paciente'}
        </button>
      </form>
    </section>
  );
}
