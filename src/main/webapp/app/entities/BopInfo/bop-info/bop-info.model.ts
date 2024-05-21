export interface IBopInfo {
  id: number;
}

export type NewBopInfo = Omit<IBopInfo, 'id'> & { id: null };
