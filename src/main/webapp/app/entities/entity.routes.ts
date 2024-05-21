import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bop-info',
    data: { pageTitle: 'bopInfoApp.bopInfoBopInfo.home.title' },
    loadChildren: () => import('./BopInfo/bop-info/bop-info.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
