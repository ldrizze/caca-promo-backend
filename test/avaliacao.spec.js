const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../main')
const { expect } = chai

chai.use(chaiHttp)

describe('CRUD Avaliações', () => {

  describe('GET /restaurantes/1/avaliacoes', () => {
    it('deve retornar uma lista de availiações para o restaurante 1', done => {
      chai.request(app)
        .get('/restaurantes/1/avaliacoes')
        .end((error, response) => {
          expect(response).to.have.status(200)
          expect(response.body).be.an('array')
          expect(response.body).to.have.length.greaterThan(0)
          done()
        })
    })
  })
})
