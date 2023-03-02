import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import { AuthController } from "./api/controllers";
import { connectDb } from './database/data-source'

const port = 3001

async function init() {
  let app = createExpressServer({
    routePrefix: '/api',
    controllers: [AuthController],
    cors: '*'
  });
  console.log('Initializing DataBase connection')
  await connectDb()
  await app.listen(port)
  console.log(`Server is running on port ${port}`)
}

init()