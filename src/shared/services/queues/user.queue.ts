import { BaseQueue } from '@service/queues/base.queue';
import { authWorker } from '@worker/auth.worker';

class UserQueue extends BaseQueue {
  constructor() {
    super('user');
    this.processJob('addUserToDB',5,authWorker.addAuthUserToDB);
  }

  public addUserJob(name: string, data: any): void {
    this.addJob(name, data);
  }
}

export const userQueue: UserQueue = new UserQueue();
