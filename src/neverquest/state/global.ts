import { atomWithReset } from "jotai/utils";

// PRIMITIVES

export const autoEquip = atomWithReset(true);

export const gameOver = atomWithReset(false);

export const lowHealthWarning = atomWithReset(true);

export const nsfw = atomWithReset(true);
