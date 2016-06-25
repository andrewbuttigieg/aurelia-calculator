    
export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['','calculator'],  name: 'calculator',      
      moduleId: './calculator',      nav: true, title:'Calculator' },
    ]);

    this.router = router;
  }
}