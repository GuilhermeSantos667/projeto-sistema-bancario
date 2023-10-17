require('dotenv').config();
const validarCampo = require("./validacoes/validarCampos");
const senha = process.env.SENHAJWT;
const bcrypt = require('bcrypt');
const knex = require('../../conexao') 

const criarConta = async (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  try {
    const camposExistem = await validarCampo(['cpf', 'email', 'telefone'], [cpf, email, telefone]);
  
    if (Object.values(camposExistem).some((campo) => campo)) {
      return res.status(400).json({ erro: "Um ou mais campos já estão em uso" });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const usuario = {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha: senhaCriptografada,
    };
    const novoUsuario = await knex("usuarios").insert(usuario);

    return res.status(201).json({message: "usuario criado!"});
  } catch (error) {
    console.log(error)
    return res.status(400).json({ erro: error.message });
  }
};


module.exports = { criarConta };
