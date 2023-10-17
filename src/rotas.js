const express = require('express');
<<<<<<< HEAD
const {verificadorDeSenha} = require('./middlewares/verificadorSenha');
const {listar, 
    criarConta,
    atualizarConta,
    deletarConta,
    depositar,
    sacar, transferir, saldo, extrato} = require('./controladores/controladores')
const rotas = express()

rotas.get("/contas", verificadorDeSenha, listar)
rotas.post('/contas', criarConta)
rotas.put('/contas/:numeroConta/usuario', atualizarConta)
rotas.delete('/contas/:numeroConta', deletarConta)
=======
// const {listar, 
//     atualizarConta,
//     deletarConta,
//     depositar,
//     sacar, transferir, saldo, extrato} = require('./controladores/controladores');

const {criarConta} = require('./controladores/usuario/cadastro')
const { validarReq, schemaUsuario } = require('./controladores/schemas/schemas');
const login = require('./controladores/usuario/login');

const rotas = express()
rotas.post('/cadastro',validarReq(schemaUsuario), criarConta)

rotas.post('/login', login)
>>>>>>> ab21c4865ab1fbb2e3cde47fb8e1922780181637

// rotas.get("/contas", listar)
// rotas.put('/contas/:numeroConta/usuario', atualizarConta)
// rotas.delete('/contas/:numeroConta', deletarConta)

// rotas.post('/transacoes/depositar', depositar)

// rotas.post('/transacoes/sacar', sacar)

// rotas.post('/transacoes/transferir', transferir)

// rotas.get('/contas/saldo', saldo)

// rotas.get('/contas/extrato', extrato)

module.exports = rotas;