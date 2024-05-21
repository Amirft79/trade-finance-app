import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBopInfo } from '../bop-info.model';
import { BopInfoService } from '../service/bop-info.service';

const bopInfoResolve = (route: ActivatedRouteSnapshot): Observable<null | IBopInfo> => {
  const id = route.params['id'];
  if (id) {
    return inject(BopInfoService)
      .find(id)
      .pipe(
        mergeMap((bopInfo: HttpResponse<IBopInfo>) => {
          if (bopInfo.body) {
            return of(bopInfo.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default bopInfoResolve;
