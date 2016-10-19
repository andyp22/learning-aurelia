import {
  RouterConfiguration,
  Router,
} from 'aurelia-router';

import { DataAPI } from './data-api';

export class App {
  router:Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Forms and Quizzes';
    config.map([
      { route: ['', 'home'],       name: 'home',       moduleId: 'home/index' },
      { route: 'multChoice',       name: 'multChoice', moduleId: 'mult-choice/mult-choice', title: 'Multiple Choice' },
      // { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
      // { route: 'files/*path',      name: 'files',      moduleId: 'files/index',   href:'#files',   nav: 0 }
    ]);
  };
}
