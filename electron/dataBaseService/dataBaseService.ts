import { Connection, createConnection } from 'typeorm';

/**
 * Classe para isolar a conexão com o banco e o acesso à conexão.
 */
class DataBaseService {

  /**
   * Conexão com o banco.
   */
  private connection: Connection = null;

  /**
   * Cria a conexão e a armazena em instância.
   */
  public conect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.connection != null) {
        resolve();
      }

      createConnection({
        type: 'sqlite',
        synchronize: false,
        logging: true,
        logger: 'advanced-console',
        database: './dataBase/exCarmina.sqlite',
        entities: [
          './dist_electron/out-tsc/entity/*.js'
        ]
      }).then((con: Connection) => {
        console.log('criei');
        this.connection = con;
        resolve();
      }).catch((e: Error) => {
        console.log(e);
        reject(e);
      });
    });
  }

  /**
   * Retorna a conexão previamente criada, ou dispara um erro caso não haja uma conexão criada.
   */
  public getConnection(): Connection {
    if (this.connection == null) {
      throw new Error('The connection was not created yet. Please call connect() before calling ' +
                      'getConnection().');
    }

    return this.connection;
  }
}

export const dataBaseService: DataBaseService = new DataBaseService();
