import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Lixeira from "../assets/lixeira.svg";
import Editar from "../assets/editar.svg";
import Add from "../assets/add.svg";

function ListaAnimais() {
  const [dados, setDados] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://localhost:8800")
      .then((response) => response.json())
      .then((data) => {
        setDados(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setMensagem("Erro ao buscar animaiszinhos no servidor.");
      });
  }, []);

  const deletarAnimal = (id) => {
    fetch(`http://localhost:8800/${id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        const data = contentType && contentType.includes("application/json")
          ? await response.json()
          : { mensagem: await response.text() };

        setMensagem(data.mensagem);

        if (data.mensagem.includes("sucesso")) {
          setDados((anteriores) => anteriores.filter((item) => item.id !== id));

          setTimeout(() => {
            setMensagem("");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar:", error);
        setMensagem("Erro ao tentar deletar o animalzinho.");
      });
  };

  return (
    <>
      <header className="cabecalho-nome">
        <h1>Nicole Guarnieri</h1>
      </header>

      <div className="lista-animais">
        <div>
          <Link to="/create" className="botao-adicionar">
            <img className="add-image" src={Add} alt="Adicionar" style={{ width: "50px", height: "50px" }} />
          </Link>
        </div>

        <h1 className="titulo-lista">Listando Animais</h1>

        {mensagem && (
          <p style={{
            color: mensagem.includes("sucesso") ? "green" : "red",
            fontWeight: "bold",
            marginBottom: "10px"
          }}>
            {mensagem}
          </p>
        )}

        <ul className="itens-lista">
          {dados.map((item) => (
            <li key={item.id} className="item-lista">
              <p className="info-animal"><strong>Nome:</strong> {item.nome}</p>
              <p className="info-animal"><strong>Espécie:</strong> {item.especie}</p>
              <div className="acoes-animal">
                <Link to="/detalhes" state={{ animal: item }} className="botao-detalhes">MAIS DETALHES</Link>
                <Link to={`/edit/${item.id}`} className="botao-acao">
                  <img src={Editar} alt="Editar" style={{ width: "18px", height: "18px" }} />
                </Link>
                <button onClick={() => deletarAnimal(item.id)} className="botao-deletar">
                  <img src={Lixeira} alt="Deletar" style={{ width: "20px", height: "20px" }} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ListaAnimais;
