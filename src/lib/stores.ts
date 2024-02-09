import { writable } from "svelte/store";
import { type BlockId } from "./utils";


export type CellStatus = false | 'available' | 'configuring';

export type CellData = {
  cellStatus: CellStatus;
  tolerance: number;
};

export const allCells = writable<Record<BlockId, CellData>>({});

export type MouseStatus =
  | {
    isDown: true;
    targetStatus: CellStatus;
  }
  | {
    isDown: false;
    targetStatus: undefined;
  };

export const mouseStatus = writable<MouseStatus>({ isDown: false, targetStatus: undefined });

export type CalendarMode = 'availability' | 'confirmation';

export const mode = writable<CalendarMode>('availability');
