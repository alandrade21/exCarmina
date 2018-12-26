import { Connection, createConnection } from 'typeorm';

/**
 * Class to isolate the database connection and the access to the connection object.
 */
class DataBaseService {

  /**
   * Data base connection.
   */
  private connection: Connection = null;

  /**
   * Create the database connection and stores it.
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
        // console.log('criei');
        this.connection = con;
        resolve();
      }).catch((e: Error) => {
        console.log(e);
        reject(e);
      });
    });
  }

  /**
   * Returns the database connection previously created, or throws an error in case no connection
   * exists.
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
