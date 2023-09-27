const express = require('express');
const {verificadorDeSenha} = require('./middlewares/verificadorSenha');
const {listar, 
    atualizarConta,
    deletarConta,
    depositar,
    sacar, transferir, saldo, extrato} = require('./controladores/controladores');

const {criarConta} = require('./controladores/usuario/cadastro')
const { validarReq, schemaUsuario } = require('./controladores/schemas/schemas');

const rotas = express()
rotas.post('/contas',validarReq(schemaUsuario), criarConta)

rotas.get("/contas", verificadorDeSenha, listar)
rotas.put('/contas/:numeroConta/usuario', atualizarConta)
rotas.delete('/contas/:numeroConta', deletarConta)

rotas.post('/transacoes/depositar', depositar)

rotas.post('/transacoes/sacar', sacar)

rotas.post('/transacoes/transferir', transferir)

rotas.get('/contas/saldo', saldo)

rotas.get('/contas/extrato', extrato)

module.exports = rotas;