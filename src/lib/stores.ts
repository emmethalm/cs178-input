import { writable } from "svelte/store";
import { type BlockId } from "./utils";

export const selectedHours = writable<Record<BlockId, boolean>>({});

export type MouseStatus =
  | {
    isDown: true;
    fill: boolean;
  }
  | {
    isDown: false;
    fill: undefined;
  };

export const mouseStatus = writable<MouseStatus>({ isDown: false, fill: undefined });

