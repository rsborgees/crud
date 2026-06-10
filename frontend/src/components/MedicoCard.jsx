export default function MedicoCard({ medico, onDelete }) {
  const handleDelete = async () => {
    if (confirm(`Excluir médico ${medico.nome}?`)) {
      try {
        await onDelete(medico.id);
      } catch (e) {
        // noop
      }
    }
  };

  return (
    <article className="card">
      <h3>{medico.nome || medico.name || 'Médico'}</h3>
      <p>Especialidade: {medico.especialidade || medico.specialty || 'Não informado'}</p>
      <p>Telefone: {medico.telefone || medico.phone || 'Não informado'}</p>
      <div style={{ marginTop: 8 }}>
        <button className="button-secondary" onClick={handleDelete}>
          Excluir
        </button>
      </div>
    </article>
  );
}
