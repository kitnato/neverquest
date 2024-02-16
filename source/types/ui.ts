import type { SVGIcon } from "@neverquest/types/components";

export type Animation =
  | "bounceIn"
  | "fadeOutUp"
  | "flipInX"
  | "headShake"
  | "heartBeat"
  | "pulse"
  | "zoomIn"
  | "zoomInRight"
  | "zoomOut";

export type AnimationSpeed = "fast" | "faster" | "slow" | "slower";

export type BootstrapColorVariant = "dark" | "outline-dark" | "secondary";

export type DeltaDisplay = {
  color: "text-danger" | "text-muted" | "text-success";
  value: number | string;
};

export type DeltaReserve =
  | { isRegeneration: true }
  | (DeltaReserveBase & { isRegeneration?: false });

export type DeltaReserveBase = {
  delta?: DeltaDisplay | DeltaDisplay[];
  value: number;
};

export type Description = {
  description: string;
  descriptionIcons?: SVGIcon[];
};

export type UIAttachment = "above" | "below";
