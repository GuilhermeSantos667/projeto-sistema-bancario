const knex = require('./../../conexao/conexao')
const schemaUsuario = require('./schemas')


const criarConta = async (req, res) =>{
  const {nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha} = req.body
 try {

  return res.json()
 } catch (error) {
  console.log(error)
    return res.status(400).json({message: error.message})
 }
    
     

}