import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { UserModel } from './models/user-model'


export const financesDataSource = new DataSource({
    type: "sqlite",
    database: "template.db",
    synchronize: true,
    logging: true,
    entities: [UserModel],
    subscribers: [],
    migrations: [],
})

export const connectDb = async () => {
    await financesDataSource.initialize()
    .then(() => console.log('Database Connection Initialized'))
    .catch(error => console.log(error))
}