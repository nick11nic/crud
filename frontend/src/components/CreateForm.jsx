import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/form.css";

function FormularioCadastroAnimal() {
  const [dadosAnimal, setDadosAnimal] = useState({
    nome: '',
    especie: '',
    idade: '',
    peso: '',
    cor: ''
  });

  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const navegar = useNavigate();

  const exibirErroTemporario = (campo, mensagem) => {
    setErros(prev => ({ ...prev, [campo]: mensagem }));
    setTimeout(() => {
      setErros(prev => ({ ...prev, [campo]: "" }));
    }, 2000);
  };

  const atualizarCampo = (e) => {
    const { name, value } = e.target;

    if (["nome", "especie", "cor"].includes(name)) {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚãõÃÕçÇ\s]*$/.test(value)) {
        exibirErroTemporario(name, "Apenas letras são permitidas.");
        return;
      }
    }

    if (["idade", "peso"].includes(name)) {
      if (value === "") {
        setDadosAnimal(prev => ({ ...prev, [name]: "" }));
        return;
      }

      if (!/^\d*\.?\d*$/.test(value)) {
        exibirErroTemporario(name, "Digite apenas números.");
        return;
      }

      const num = parseFloat(value);
      if (num < 0) {
        exibirErroTemporario(name, "Não pode ser negativo.");
        return;
      }
    }

    setDadosAnimal(prev => ({ ...prev, [name]: value }));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    if (!dadosAnimal.nome || !dadosAnimal.especie || !dadosAnimal.idade || !dadosAnimal.peso || !dadosAnimal.cor) {
      setMensagem("Por favor, preencha todos os campos.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    fetch("http://localhost:8800/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosAnimal)
    })
      .then(res => res.json())
      .then(data => {
        setMensagem("Animalzinho cadastrado com sucesso!");
        setTimeout(() => {
          setMensagem("");
          navegar("/");
        }, 2000);
      })
      .catch(err => {
        console.error("Erro ao adicionar animalzinho:", err);
        setMensagem("Erro ao cadastrar o animalzinho.");
        setTimeout(() => setMensagem(""), 2000);
      });
  };

  return (
    <div className="container">
      <div className="formulario-animal">
        <h2 className="titulo">Adicionar Novo Animal</h2>

        {mensagem && (
          <p style={{
            color: mensagem.includes("sucesso") ? "green" : "red",
            fontWeight: "bold",
            marginBottom: "10px"
          }}>
            {mensagem}
          </p>
        )}

        <form onSubmit={enviarFormulario}>
          <div className="campo-formulario">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={dadosAnimal.nome} onChange={atualizarCampo} required />
            {erros.nome && <p className="erro">{erros.nome}</p>}
          </div>

          <div className="campo-formulario">
            <label htmlFor="especie">Espécie:</label>
            <input type="text" id="especie" name="especie" value={dadosAnimal.especie} onChange={atualizarCampo} required />
            {erros.especie && <p className="erro">{erros.especie}</p>}
          </div>

          <div className="campo-formulario">
            <label htmlFor="idade">Idade:</label>
            <input
              type="text"
              inputMode="numeric"
              id="idade"
              name="idade"
              value={dadosAnimal.idade}
              onChange={atualizarCampo}
              required
            />
            {erros.idade && <p className="erro">{erros.idade}</p>}
          </div>

          <div className="campo-formulario">
            <label htmlFor="peso">Peso:</label>
            <input
              type="text"
              inputMode="decimal"
              id="peso"
              name="peso"
              value={dadosAnimal.peso}
              onChange={atualizarCampo}
              required
            />
            {erros.peso && <p className="erro">{erros.peso}</p>}
          </div>

          <div className="campo-formulario">
            <label htmlFor="cor">Cor:</label>
            <input type="text" id="cor" name="cor" value={dadosAnimal.cor} onChange={atualizarCampo} required />
            {erros.cor && <p className="erro">{erros.cor}</p>}
          </div>

          <button type="submit" className="botao">Cadastrar</button>
        </form>

        <Link to="/" className="botao-fechar">Fechar</Link>
      </div>

      <style>{`
        .erro {
          color: red;
          font-size: 0.9em;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}

export default FormularioCadastroAnimal;
