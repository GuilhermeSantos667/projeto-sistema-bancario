const app = require('../../src/index')
const request = require('supertest')
describe('validacoes do usuario', () =>{


  it('validar body vazio', async () =>{

    const response = await request(app).post('/contas').send()

  })
  it('Adicionar conta sem informar nome', async () => {
    const response = await request(app).post('/contas').send({
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
  const repetido = await request(app).post('/contas').send({

      email: "Teste@Teste.com",
      cpf: "11111111111",
      data_nascimento: "01/01/1970",
      telefone: "99999999999",
      senha: "test123@"
  })
  const response = await request(app).post('/contas').send({
    
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
it('Adicionar conta correta', async () => {
  const response = await request(app).post('/contas').send({
      nome: "teste",
      email: "Teste@Teste.com",
      cpf: "11111111111",
      data_nascimento: "2023-09-02",
      telefone: "99999999999",
      senha: "test123@"
  })
  expect(response.statusCode).toEqual(201)
  expect(response.body).toEqual(
      expect.objectContaining({
          message: expect.any(String)
      })
  )

  
})

})