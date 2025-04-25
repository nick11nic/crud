import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditForm() {
  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    idade: '',
    peso: '',
    cor: ''
  });

  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8800`)
      .then((res) => res.json())
      .then((data) => {
        const animal = data.find(item => item.id === parseInt(id));
        if (animal) setFormData(animal);
      });
  }, [id]);

  const exibirErroTemporario = (campo, mensagem) => {
    setErros(prev => ({ ...prev, [campo]: mensagem }));
    setTimeout(() => {
      setErros(prev => ({ ...prev, [campo]: "" }));
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "text" && !/^[a-zA-ZáéíóúÁÉÍÓÚãõÃÕçÇ\s]*$/.test(value)) {
      exibirErroTemporario(name, "Apenas letras são permitidas.");
      return;
    }

    if (type === "number") {
      if (value === "") {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        return;
      }

      // números e ponto
      if (!/^\d*\.?\d*$/.test(value)) {
        exibirErroTemporario(name, "Digite apenas números.");
        return;
      }

      const numberValue = parseFloat(value);

      if (numberValue < 0) {
        exibirErroTemporario(name, "Não pode ser negativo.");
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.especie || !formData.idade || !formData.peso || !formData.cor) {
      setMensagem("Por favor, preencha todos os campos.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    fetch(`http://localhost:8800/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setMensagem("Animal atualizado com sucesso!");
        setTimeout(() => {
          setMensagem("");
          navigate("/");
        }, 2000);
      })
      .catch(err => {
        console.error("Erro ao atualizar:", err);
        setMensagem("Erro ao atualizar o animal.");
        setTimeout(() => setMensagem(""), 2000);
      });
  };

  return (
    <div className="container">
      <div className="formulario-animal">
        <h2 className="titulo">Editar Animal</h2>

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
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            {erros.nome && <p className="erro">{erros.nome}</p>}
          </div>

          <div className="campo-formulario">
            <label htmlFor="especie">Espécie:</label>
            <input type="text" id="especie" name="especie" value={formData.especie} onChange={handleChange} required />
            {erros.especie && <p className="erro">{erros.especie}</p>}
          </div>

          <div className="campo-formulario">
            <label htmlFor="idade">Idade:</label>
            <input type="number" id="idade" name="idade" value={formData.idade} onChange={handleChange} required />
            {erros.idade && <p className="erro">{erros.idade}</p>}
          </div>

          <div className="campo-formulario">
            <label htmlFor="peso">Peso:</label>
            <input type="number" id="peso" name="peso" value={formData.peso} onChange={handleChange} required />
            {erros.peso && <p className="erro">{erros.peso}</p>}
          </div>

          <div className="campo-formulario">
            <label htmlFor="cor">Cor:</label>
            <input type="text" id="cor" name="cor" value={formData.cor} onChange={handleChange} required />
            {erros.cor && <p className="erro">{erros.cor}</p>}
          </div>

          <button type="submit" className="botao">Salvar Alterações</button>
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

export default EditForm;
