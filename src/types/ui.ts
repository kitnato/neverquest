export enum AnimationSpeed {
  Fast = "fast",
  Faster = "faster",
  Slow = "slow",
  Slower = "slower",
}

export enum AnimationType {
  FadeInRight = "fadeInRight",
  FadeOutUp = "fadeOutUp",
  FlipInX = "flipInX",
  HeadShake = "headShake",
  Pulse = "pulse",
  ZoomInRight = "zoomInRight",
}

export type DeltaDisplay = DeltaDisplayContents | DeltaDisplayContents[];

interface DeltaDisplayContents {
  color: FloatingText | null;
  value: number | string;
}

export interface DeltaReserve {
  delta?: DeltaDisplay;
  value: number;
}

export enum FloatingText {
  Negative = "text-danger",
  Neutral = "text-muted",
  Positive = "text-success",
}

export enum OverlayPlacement {
  Bottom = "bottom",
  Top = "top",
}

export enum UIAttachment {
  Above,
  Below,
}

export enum UISize {
  Normal,
  Tiny,
}

// Using Bootstrap 5 variants.
export enum UIVariant {
  Outline = "outline-dark",
  Primary = "dark",
  Secondary = "secondary",
}
