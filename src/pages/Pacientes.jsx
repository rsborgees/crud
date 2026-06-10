import { useEffect, useState } from 'react';
import { getPacientes } from '../services/pacienteService';
import PacienteCard from '../components/PacienteCard';

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPacientes()
      .then((data) => setPacientes(data || []))
      .catch(() => setPacientes([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1 className="page-title">Pacientes</h1>
      <p className="page-description">Gerencie os pacientes cadastrados na clínica.</p>
      {loading ? (
        <div className="empty-state">Carregando pacientes...</div>
      ) : pacientes.length === 0 ? (
        <div className="empty-state">Nenhum paciente encontrado.</div>
      ) : (
        <div className="card-grid">
          {pacientes.map((paciente) => (
            <PacienteCard key={paciente.id ?? paciente._id ?? paciente.cpf} paciente={paciente} />
          ))}
        </div>
      )}
    </section>
  );
}
