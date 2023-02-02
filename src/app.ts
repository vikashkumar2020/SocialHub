import express, {Express} from "express";
import { SocialHubServer } from "./setupServer";
import databaseConnection from './setupDatabase';

class Application{

    public initialize():void {
        databaseConnection();
        const app: Express = express();
        const server: SocialHubServer = new SocialHubServer(app);
        server.start();
    }
}

const application: Application = new Application();
application.initialize();

