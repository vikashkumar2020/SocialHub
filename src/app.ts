import express, { Express } from 'express';
import { SocialHubServer } from '@root/setupServer';
import databaseConnection from '@root/setupDatabase';
import { config } from '@root/config';

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: SocialHubServer = new SocialHubServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinayConfig();
  }
}

const application: Application = new Application();
application.initialize();
