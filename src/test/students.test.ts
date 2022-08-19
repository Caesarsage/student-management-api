import chai from 'chai'
import chaiHttp from 'chai-http'
import { launchServer } from '../main'

chai.should()

chai.use(chaiHttp)
const expect = chai.expect

const testStudent = {
  name: 'test',
  gender: 'male',
  classLevel: 'SS 2'
}

describe('Create student endpoint', () => {
  // Test the /POST route
  describe('/POST /api/students', () => {
    it('it should register the student', async () => {
      const app = await chai.request(launchServer)
      app.post('/api/student')
        .send(testStudent)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('successfully created')
          res.body.should.have.property('id').eql(1)
        })
    })
  })

  // Test failed /POST route
  describe('/POST /api/students', () => {
    it('it should not register the student', async () => {
      const app = await chai.request(launchServer)
      app.post('/api/student')
        .send({})
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('message').eql('error creating student')
          res.body.should.have.property('error')
        })
    })
  })

  // Test the /GET route
  describe('/GET /api/students', () => {
    it('it should GET all the students', async () => {
      const app = await chai.request(launchServer)
      app.get('/api/students')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
        })
    })
  })

  // Test not found /GET route
  describe('/GET /api/students', () => {
    it('it should not GET all the students', async () => {
      const app = await chai.request(launchServer)
      app.get('/api/student')
        .end((err, res) => {
          res.should.have.status(404)
        })
    })
  })

  // Test the /GET By id route
  describe('/GET /api/student/:id', async () => {
    const app = await chai.request(launchServer)
    app.get('/api/student/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
      })
  })

  // Test the /PUT route
  describe('/PUT /api/student/:id', async () => {
    const app = await chai.request(launchServer)
    app.put('/api/student/1')
      .send({
        name: 'updated'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
      })
  })

  // Test the /DELETE route
  describe('/DELETE /api/student/:id', async () => {
    const app = await chai.request(launchServer)
    app.delete('/api/student/1')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
      })
  })
})