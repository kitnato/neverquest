export enum AnimationSpeed {
  Fast = "fast",
  Faster = "faster",
  Slow = "slow",
  Slower = "Slower",
}

export enum AnimationType {
  BlurOut = "blurOut",
  HeadShake = "headShake",
  FadeInRight = "fadeInRight",
  FlipInX = "flipInX",
  Pulse = "pulse",
  ZoomInRight = "zoomInRight",
}

export type DeltaDisplay = DeltaDisplayContents | DeltaDisplayContents[];

export interface DeltaDisplayContents {
  color: FloatingTextType | null;
  value: string;
}

export enum FloatingTextType {
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
