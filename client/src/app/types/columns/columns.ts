import { Signal } from '@angular/core';

export type TColumnType = {
  name: string;
  completed: boolean;
  subColumns: Signal<{ name: string; column: string; completed: boolean }[]>;
};
