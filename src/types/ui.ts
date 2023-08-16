export type Animation =
  | "bounceIn"
  | "fadeOutUp"
  | "flipInX"
  | "headShake"
  | "pulse"
  | "zoomIn"
  | "zoomInRight"
  | "zoomOut";

export type AnimationSpeed = "fast" | "faster" | "slow" | "slower";

export type BootstrapColorVariant = "dark" | "outline-dark" | "secondary";

export type BootstrapTextVariant = "text-danger" | "text-muted" | "text-success";

export type DeltaDisplay = DeltaDisplayContents | DeltaDisplayContents[];

type DeltaDisplayContents = {
  color: BootstrapTextVariant | null;
  value: number | string;
};

export type DeltaReserve = {
  delta?: DeltaDisplay;
  value: number;
};

export type FloatingText = {
  delta: DeltaDisplay;
  key: string;
};

export type UIAttachment = "above" | "below";

export type UISize = "normal" | "tiny";
