const jwt = require('jsonwebtoken'); 
const senhaJWT = process.env.SENHAJWT;
const bcrypt = require('bcrypt');
const knex = require('../../conexao/conexao') 

const login = async(req, res) =>{
  const {email, senha} = req.body

  try {

    const usuario = await knex("usuarios").where({ email }).first();
    if(usuario === undefined){
      return res.status(400).json({erro: "email incorreto"})
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if(!senhaValida){

        return res.status(400).json({erro : "senha incorreta!"})
    }

    const token = jwt.sign({id: usuario.id}, senhaJWT, {expiresIn: '8h'})

    const {senha: _, cpf: __, data_nascimento: ___, telefone: ____, ...usuarioLogado} = usuario
    
    return res.status(200).json({usuario: usuarioLogado, token})

  } catch (error) {
    console.log(error)
  }
}

module.exports = login