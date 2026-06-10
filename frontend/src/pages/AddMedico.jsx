import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMedico } from '../services/medicoService';

export default function AddMedico() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', especialidade: '', telefone: '' });
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
      await createMedico(form);
      navigate('/medicos');
    } catch (err) {
      setError('Não foi possível salvar o médico.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h1 className="page-title">Adicionar médico</h1>
      <p className="page-description">Preencha os dados para criar um novo médico.</p>
      <form className="card" onSubmit={handleSubmit}>
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
        {error && <div className="error-message">{error}</div>}
        <button className="button-primary" type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar médico'}
        </button>
      </form>
    </section>
  );
}
