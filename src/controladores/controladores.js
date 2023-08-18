const { query } = require('express');
const {contas, depositos, saques, transferencias} = require('../bancodedados');
const { format } = require('date-fns');
const listar = (req, res) =>{
    return res.status(200).json(contas)
}
const verificaElemento = (campo, valor) =>{
  const elementoExistente = contas.find((elemento) =>{
      return elemento.usuario[campo] === valor
  })
  return elementoExistente
  }
const criarConta = (req, res) =>{
    const {Nome,
        Cpf,
        DataNascimento,
        Telefone,
        Email,
        Senha} = req.body
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: "campo incompleto! por favor revise e tente novamente"})
        }

        const contaCriada = {
            numero : contas.length+1,
            saldo: 0,
            usuario:{
            Cpf,
            DataNascimento,
            Telefone,
            Email,
            Senha}

        }
        const verificaEmail = verificaElemento("Email", Email)
        const verificarCpf = verificaElemento("Cpf", Cpf)
        if(verificarCpf !== undefined){
            return res.status(400).json({message: "Cpf ja existente"})
        }
        if(verificaEmail !== undefined){
            return res.status(400).json({message: "email ja existente"})
        }

        contas.push(contaCriada)

        return res.status(201).json({...contaCriada})

}

const contaProcuradaIndex = (numeroConta) =>{
  return contas.findIndex((elemento ) =>{
    return Number(elemento.numero) === Number(numeroConta)
  })
}

const atualizarConta = (req, res) => {
  const {numeroConta} = req.params
  const {Nome,
    Cpf,
        DataNascimento,
        Telefone,
        Email,
        Senha} = req.body

    const verificaEmail = verificaElemento("Email", Email)
    const verificarCpf = verificaElemento("Cpf", Cpf)
    if(verificarCpf !== undefined){
        return res.status(400).json({message: "Cpf ja existente"})
    }
    if(verificaEmail !== undefined){
        return res.status(400).json({message: "email ja existente"})
    }
    if (!Nome && !DataNascimento && !Telefone && !Senha) { 
        return res.status(400).json({ message: "É necessário ao menos 1 propriedade a ser atualizada!" });
      }

      const contaIndex = contaProcuradaIndex(numeroConta)
      if (contaIndex === -1) {
        return res.status(400).json({ message: "Conta procurada não existe." });
      }
      
      const contaProcurada = contas[contaIndex];
      
      if (Nome) {
        contaProcurada.usuario.Nome = Nome;
      }
      if (Cpf) {
        contaProcurada.usuario.Cpf = Cpf;
      }
      if (DataNascimento) {
        contaProcurada.usuario.DataNascimento = DataNascimento;
      }
      if (Telefone) {
        contaProcurada.usuario.Telefone = Telefone;
      }
      if (Email) {
        contaProcurada.usuario.Email = Email;
      }
      if (Senha) {
        contaProcurada.usuario.Senha = Senha;
      }
      
      return res.status(200).json({message: "conta atualizada!"})

  }

const deletarConta = (req, res) =>{
  const {numeroConta} = req.params
  const contaIndex = contaProcuradaIndex(numeroConta)
  console.log(numeroConta)
  if(contaIndex === -1){
    return res.status(400).json({message: "conta nao encontrada!"})
  }
  if(contas[contaIndex].saldo !== 0){
    return res.status(400).json({message: "nao eh possivel excluir uma conta com saldo positivo"})
  }

  contas.splice(contaIndex, 1)

  return res.status(200).json({message: "conta excluida com sucesso!"})

}
const contaProcuradaObj = (numeroConta) => {
  return contas.find((elemento) => {
    return elemento.numero == numeroConta;
  });
};
const depositar = (req, res) => {
  const { numeroConta, valor } = req.body;

  const contaProcurada = contaProcuradaObj(numeroConta);

  if (!numeroConta || !valor) {
    return res
      .status(400)
      .json({ message: "É necessário informar o número da conta e o valor." });
  }
  if (!contaProcurada) {
    return res
      .status(400)
      .json({ message: "A conta procurada não existe." });
  }
  if (Number(valor) === 0 || Number(valor) < 0) {
    return res
      .status(400)
      .json({
        message: "Não é possível depositar valores negativos ou zerados.",
      });
  }
  const data = new Date();
  const dataFormatada = format(data, "yyyy-MM-dd HH:mm:ss"); 

  const valorNumerico = Number(valor); 

  contaProcurada.saldo += valorNumerico;

  depositos.push({ dataFormatada, numeroConta, valor: valorNumerico });

  return res
    .status(200)
    .json({ message: "Depósito realizado com sucesso!" });
};
const sacar = (req, res) =>{ 

  const {numeroConta, valor, senha} = req.body

  if(!numeroConta || !valor || !senha){
    return res.status(400).json({message: 'é necessario informar o numero da conta, valor e senha'})
  }
  const contaProcurada = contaProcuradaObj(numeroConta)

    if(!contaProcurada){
      return res.status(400).json({message: "conta procurada inexistente"})
    }
    if(senha !== contaProcurada.usuario.Senha){
      return res.status(400).json({message: "senha invalida"})
    }
    if(valor > contaProcurada.saldo){
      return res.status(400).json({message: "saldo indisponivel!"})
    }

    const valorNumerico = Number(valor)

    contaProcurada.saldo -= valorNumerico
    // Subtrair o valor sacado do saldo da conta encontrada

    const data = new Date();
    const dataFormatada = format(data, "yyyy-MM-dd HH:mm:ss");
    
    saques.push({dataFormatada, numeroConta, valor})


    return res.status(200).json({message: "Saque realizado com sucesso!"})
    
}
const transferir = (req, res) => {
  const {conta_origem, conta_destino, valor, senha} = req.body

let contaProcuradaOrigem = contaProcuradaObj(conta_origem)
if(!contaProcuradaOrigem){
  return res.status(400).json({message: "conta de origem nao existente"})
}
let contaProcuradaDestino = contaProcuradaObj(conta_destino)
if(!contaProcuradaDestino){
  return res.status(400).json({message: "conta de destino nao existente"})
}
if(senha !== contaProcuradaOrigem.usuario.Senha){
  return res.status(400).json({message: "senha incorreta!"})
}
if(contaProcuradaOrigem.saldo < valor){
  return res.status(400).json({message: "saldo insuficiente"})
}
  contaProcuradaOrigem.saldo -= valor

  contaProcuradaDestino.saldo += valor

  console.log(contaProcuradaDestino, contaProcuradaOrigem)

  const data = new Date();
  const dataFormatada = format(data, "yyyy-MM-dd HH:mm:ss");

  transferencias.push({dataFormatada, conta_origem, conta_destino, valor})

  return res.status(200).json({message: "Transferência realizada com sucesso!"})


}
const saldo = (req, res) =>{
const {numeroConta, senha} = req.query

  if(!numeroConta || !senha){
    return res.status(400).json({message: "é necessario informar o numero da conta e senha!"})
  }
  const contaProcurada = contaProcuradaObj(numeroConta)
  if(!contaProcurada){
    return res.status(400).json({message: "conta nao encontrada! por favor revise os campos"})
  }
  console.log(senha, contaProcurada.usuario.Senha)
  if(senha !== contaProcurada.usuario.Senha){
    return res.status(400).json({message: "senha invalida!"})
  }
  return res.status(200).json({saldo: contaProcurada.saldo})

}
const extrato = (req, res) => {
const {numeroConta, senha} = req.query
if(!numeroConta || !senha){
  return res.status(400).json({message: "é obrigatorio passar numero da conta e senha!"})
}
const contaProcurada = contaProcuradaObj(numeroConta)
if(!contaProcurada){
  return res.status(400).json({message: "conta procurada inexistente"})
}
  if( senha !== contaProcurada.usuario.Senha){
    return res.status(400).json({message: "senha invalida!" })
  }
const imprimirExtrato = (numeroConta, operacao) =>{
  const extrato = [];

  for (let i of operacao) {
    if (i.numeroConta === numeroConta) {
      extrato.push(i);
    }
  }
return extrato
}
const imprimirSaques = imprimirExtrato(numeroConta, saques)
const imprimirDeposito = imprimirExtrato(numeroConta, depositos)
const transferenciasPorConta = (numeroConta, operacao) =>{
  const extrato = [];

  for (let i of operacao) {
    if (i.conta_origem === numeroConta) {
      extrato.push(i);
    }
  }
return extrato
}
const imprimirTransferencias = transferenciasPorConta(numeroConta, transferencias)


return res.status(200).json({saques: imprimirSaques, depositos: imprimirDeposito, transferencias : imprimirTransferencias})

}
    

module.exports = {listar, criarConta, atualizarConta, deletarConta, depositar, sacar, transferir, saldo, extrato}