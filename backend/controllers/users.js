import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM infos";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro ao buscar animaiszinhos:", err);
      return res.status(500).json({ mensagem: "Erro ao buscar dados no banco." });
    }
    return res.status(200).json(data);
  });
};

export const deleteUser = (req, res) => {
  const query = "DELETE FROM infos WHERE id = ?";

  db.query(query, [req.params.id], (err, data) => {
    if (err) {
      console.error("Erro ao deletar usuário:", err);
      return res.status(500).json({ mensagem: "Erro ao deletar animalzinho." });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Animalzinho não encontrado." });
    }
    return res.status(200).json({ mensagem: "Deletado com sucesso." });
  });
};

export const createUser = (req, res) => {
  const { nome, especie, idade, peso, cor } = req.body;

  if (!nome || !especie || !idade || !peso || !cor) {
    return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios." });
  }

  const q = "INSERT INTO infos (`nome`, `especie`, `idade`, `peso`, `cor`) VALUES (?, ?, ?, ?, ?)";
  const valores = [nome, especie, idade, peso, cor];

  db.query(q, valores, (err, data) => {
    if (err) {
      console.error("Erro ao criar usuário:", err);
      return res.status(500).json({ mensagem: "Erro ao criar animalzinho." });
    }
    return res.status(201).json({ mensagem: "Animalzinho criado com sucesso.", id: data.insertId });
  });
};

export const updateUser = (req, res) => {
  const { nome, especie, idade, peso, cor } = req.body;

  if (!nome || !especie || !idade || !peso || !cor) {
    return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios." });
  }

  const q = "UPDATE infos SET nome = ?, especie = ?, idade = ?, peso = ?, cor = ? WHERE id = ?";
  const valores = [nome, especie, idade, peso, cor, req.params.id];

  db.query(q, valores, (err, data) => {
    if (err) {
      console.error("Erro ao atualizar animalzinho:", err);
      return res.status(500).json({ mensagem: "Erro ao atualizar animalzinho." });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Animalzinho não encontrado." });
    }
    return res.status(200).json({ mensagem: "Animalzinho atualizado com sucesso." });
  });
};
