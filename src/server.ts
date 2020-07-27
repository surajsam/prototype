import * as express from 'express';
import { Request, Response } from 'express';
import { configuration } from './config';
import { Database } from './libs';
import * as bodyParser from 'body-parser';
import mainRoute from './route';

export class Server {
    private PORT: string = configuration.port;
    private DatabaseUrl: string = configuration.DatabseUrl;
    private app;

    constructor() {
      this.app = express();
    }

    public bootstrap(): Server {
      this.initBodyParser();
      this.setupRoutes();
      return this;
    }

    public run = async() => {
      const { PORT, app, DatabaseUrl } = this;
      try {
        const connect = await Database.open(DatabaseUrl);
        app.listen(PORT, () => console.log(connect, `App listening at http://localhost:${PORT}`));
      }
      catch (err) {
        console.log(err);
      }
    }

    private setupRoutes(): void {
      const { app } = this;
      app.use('/health-check', (req: Request, res: Response) => res.send('Hello World!'));
      app.use('/api', mainRoute);
    }

    private initBodyParser(): void {
      const { app } = this;
      app.use(bodyParser.urlencoded({extended : true}));
      app.use(bodyParser.json());
    }
}
