const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../main')
const { expect } = chai

chai.use(chaiHttp)

describe('CRUD Restaurantes', () => {

  describe('GET /restaurantes', () => {
    it('deve retornar uma lista de restaurantes', done => {
      chai.request(app)
        .get('/restaurantes')
        .end((error, response) => {
          expect(response).to.have.status(200)
          expect(response.body).be.an('array')
          expect(response.body).to.have.length.greaterThan(0)
          done()
        })
    })
  })

  describe('criar um restaurante', () => {
    let userToken = null
    it('[ADMIN] POST /session', done => {
      chai.request(app)
        .post('/session')
        .set('Content-Type', 'application/json')
        .send({
          usuario: 'admin',
          senha: '123456'
        })
        .end((error, response) => {
          expect(response).to.have.status(200)
          expect(response.body).be.an('object')
          expect(response.body).include.keys('token')
          userToken = response.body.token
          done()
        })
    })

    it('POST /restaurantes', done => {
      chai.request(app)
        .post('/restaurantes')
        .set('Content-Type', 'application/json')
        .set('Authorization', userToken)
        .send({
          nome: "Teste" + (new Date()),
          endereco: "ABC",
          numero: "123",
          bairro: "EFG",
          cep: "00000000"
        })
        .end((error, response) => {
          expect(response).to.have.status(201)
          expect(response.body).contains.keys([
            'nome', 'endereco', 'numero', 'bairro', 'cep'
          ])
          done()
        })
    })
  })
})
