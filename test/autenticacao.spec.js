const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../main')
const { expect } = chai

chai.use(chaiHttp)

describe('Funções de autenticação', () => {
  describe('Autenticação gerar token', () => {
    let userToken = null
    it('POST /session', done => {
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
  })
})
