const knex = require('../../../conexao/conexao') 


const validarCampo = async (campos, valores) => {
  try {
    const validacoes = {};

    for (let i = 0; i < campos.length; i++) {
      const campo = campos[i];
      const valor = valores[i];

      
      const validacao = await knex("usuarios").where({ [campo]: valor });

   
      validacoes[campo] = validacao.length > 0;
    }

    return validacoes;
  } catch (error) {
    console.log(error)
    return error
  }
};


  

module.exports  = validarCampo