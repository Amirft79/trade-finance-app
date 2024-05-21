import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBopInfo, NewBopInfo } from '../bop-info.model';

export type EntityResponseType = HttpResponse<IBopInfo>;
export type EntityArrayResponseType = HttpResponse<IBopInfo[]>;

@Injectable({ providedIn: 'root' })
export class BopInfoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bop-infos', 'bopinfo');

  create(bopInfo: NewBopInfo): Observable<EntityResponseType> {
    return this.http.post<IBopInfo>(this.resourceUrl, bopInfo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBopInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBopInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBopInfoIdentifier(bopInfo: Pick<IBopInfo, 'id'>): number {
    return bopInfo.id;
  }

  compareBopInfo(o1: Pick<IBopInfo, 'id'> | null, o2: Pick<IBopInfo, 'id'> | null): boolean {
    return o1 && o2 ? this.getBopInfoIdentifier(o1) === this.getBopInfoIdentifier(o2) : o1 === o2;
  }

  addBopInfoToCollectionIfMissing<Type extends Pick<IBopInfo, 'id'>>(
    bopInfoCollection: Type[],
    ...bopInfosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bopInfos: Type[] = bopInfosToCheck.filter(isPresent);
    if (bopInfos.length > 0) {
      const bopInfoCollectionIdentifiers = bopInfoCollection.map(bopInfoItem => this.getBopInfoIdentifier(bopInfoItem));
      const bopInfosToAdd = bopInfos.filter(bopInfoItem => {
        const bopInfoIdentifier = this.getBopInfoIdentifier(bopInfoItem);
        if (bopInfoCollectionIdentifiers.includes(bopInfoIdentifier)) {
          return false;
        }
        bopInfoCollectionIdentifiers.push(bopInfoIdentifier);
        return true;
      });
      return [...bopInfosToAdd, ...bopInfoCollection];
    }
    return bopInfoCollection;
  }
}
