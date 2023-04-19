export type AnimationSpeed = "fast" | "faster" | "slow" | "slower";

export type AnimationType =
  | "bounceIn"
  | "fadeOutUp"
  | "flipInX"
  | "headShake"
  | "pulse"
  | "zoomInRight";

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

export enum UIAttachment {
  Above,
  Below,
}

export enum UISize {
  Normal,
  Tiny,
}
