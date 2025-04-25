import { useLocation, Link } from 'react-router-dom';
import "../styles/detalhes.css";

function AnimalDetalhes() {
  const location = useLocation();
  const { animal } = location.state;

  return (
    <div className="detalhes-container">
      <div className="detalhes-conteudo">
        <h1>Detalhes do Animal</h1>
        <p><strong>Nome:</strong> {animal.nome}</p>
        <p><strong>Espécie:</strong> {animal.especie}</p>
        <p><strong>Idade:</strong> {animal.idade}</p>
        <p><strong>Peso:</strong> {animal.peso}</p>
        <p><strong>Cor:</strong> {animal.cor}</p>
        <Link to="/" className="botao-fechar">Fechar</Link>
      </div>
    </div>
  );
}

export default AnimalDetalhes;
