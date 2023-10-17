const app = require('../../src/index')
const request = require('supertest')
describe('validacoes do usuario', () =>{


  it('validar body vazio', async () =>{

    const response = await request(app).post('/cadastro').send()

  })
  it('Adicionar conta sem informar nome', async () => {
    const response = await request(app).post('/cadastro').send({
        email: "Teste@Teste.com",
        cpf: "11111111111",
        data_nascimento: "01/01/1970",
        telefone: "99999999999",
        senha: "test123@"
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(
        expect.objectContaining({
            erro: expect.any(String)
        })
    )
})
it('Adicionar conta com campo repetido', async () => {
  const repetido = await request(app).post('/cadastro').send({

    nome: "teste",
    email: "Teste@Teste.com",
    cpf: "11111111111",
    data_nascimento: "2023-09-02",
    telefone: "99999999999",
    senha: "test123@"
  })
  const response = await request(app).post('/cadastro').send({
    
    nome: "teste",
    email: "Teste@Teste.com",
    cpf: "11111111111",
    data_nascimento: "2023-09-02",
    telefone: "99999999999",
    senha: "test123@"
})

  expect(response.statusCode).toEqual(400)
  expect(response.body).toEqual(
      expect.objectContaining({
          erro: expect.any(String)
      })
  )
})

it('email errado', async () =>{
  const response = await request(app).post('/login').send({
    email: "Teste@aaseste.com",
    senha: "test123@"

})
expect(response.statusCode).toEqual(400)
expect(response.body).toEqual(
    expect.objectContaining({
        erro: expect.any(String)
    })
)
})
it('senha errada', async () =>{
  const response = await request(app).post('/login').send({
    email: "Teste@Teste.com",
    senha: "test12asd3@"

})
expect(response.statusCode).toEqual(400)
expect(response.body).toEqual(
    expect.objectContaining({
        erro: expect.any(String)
    })
)
})
})