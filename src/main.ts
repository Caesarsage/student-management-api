import { readConfig } from './config'
import { startServer } from './server'

export const launchServer = async () => {
  const app = await startServer()

  let port: number | string | undefined
  if(process.env.NODE_ENV === 'test') {
    port = 8111
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
  port = readConfig.port
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

launchServer()