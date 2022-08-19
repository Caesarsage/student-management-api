import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/test')

mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
    console.warn('Error : ',error)
  })//Called hooks which runs before something.

beforeEach((done) => {
  mongoose.connection.collections.test.drop(() => {
    done()
  })
})

