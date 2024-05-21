import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { BopInfoComponent } from './list/bop-info.component';
import { BopInfoDetailComponent } from './detail/bop-info-detail.component';
import { BopInfoUpdateComponent } from './update/bop-info-update.component';
import BopInfoResolve from './route/bop-info-routing-resolve.service';

const bopInfoRoute: Routes = [
  {
    path: '',
    component: BopInfoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BopInfoDetailComponent,
    resolve: {
      bopInfo: BopInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BopInfoUpdateComponent,
    resolve: {
      bopInfo: BopInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default bopInfoRoute;
