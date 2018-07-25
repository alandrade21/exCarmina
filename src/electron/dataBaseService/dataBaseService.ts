import { Connection, createConnection } from 'typeorm';

class DataBaseService {

  public async conect(): Promise<Connection> {
    const connection: Connection = await createConnection({
      type: 'sqlite',
      synchronize: false,
      logging: true,
      logger: 'advanced-console',
      database: './../../../dataBase/exCarmina.db',
      entities: [
        './../../entity/*.js'
      ]
    });

    return connection;
  }
}

export const dataBaseService: DataBaseService = new DataBaseService();
