import { Summary } from './types';

export interface SetupAble {
  setup(data: Summary): void;
}

export interface Component extends SetupAble {
  onLoad?(): void;
}
