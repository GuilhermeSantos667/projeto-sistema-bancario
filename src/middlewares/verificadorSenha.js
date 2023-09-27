const {banco} = require('../conexao')



const verificadorDeSenha = (req, res, next)=>{
const {senha} = banco
const senhaDigitada = req.query.senha

    if(senhaDigitada !== senha){
        return res.status(400).json({message: "senha invalida!"})

    }else if(!senhaDigitada){
        return res.status(400).json({message: "senha inexistente!"})
    }

     next()

}

module.exports = {verificadorDeSenha}

