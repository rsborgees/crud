import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section>
      <h1 className="page-title">Página não encontrada</h1>
      <p className="page-description">A rota solicitada não existe.</p>
      <Link to="/">Voltar para o início</Link>
    </section>
  );
}
