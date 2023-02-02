import express, {Express} from "express";
import { SocialHubServer } from "./setupServer";

class Application{

    public initialize():void {
        const app: Express = express();
        const server: SocialHubServer = new SocialHubServer(app);
        server.start();
    }
}

const application: Application = new Application();
application.initialize();

