import { IBopInfo, NewBopInfo } from './bop-info.model';

export const sampleWithRequiredData: IBopInfo = {
  id: 4498,
};

export const sampleWithPartialData: IBopInfo = {
  id: 27628,
};

export const sampleWithFullData: IBopInfo = {
  id: 9265,
};

export const sampleWithNewData: NewBopInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
