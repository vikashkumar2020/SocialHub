import { SignIn } from '@auth/controllers/signin';
import { SignOut } from '@auth/controllers/signout';
import { SignUp } from '@auth/controllers/signup';
import express, {Router} from 'express';


class AuthRoutes{
  private router : Router;

  constructor(){
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/signin',SignIn.prototype.read);
    this.router.post('/signup',SignUp.prototype.create);
    return this.router;
  }
  public signoutRoute(): Router {
    this.router.get('/signout',SignOut.prototype.update);

    return this.router;
  }
};

export const authroutes: AuthRoutes =new AuthRoutes();
