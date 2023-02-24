export enum AnimationSpeed {
  Fast = "fast",
  Faster = "faster",
  Slow = "slow",
  Slower = "slower",
}

export enum AnimationType {
  BounceIn = "bounceIn",
  FadeOutUp = "fadeOutUp",
  FlipInX = "flipInX",
  HeadShake = "headShake",
  Pulse = "pulse",
  ZoomInRight = "zoomInRight",
}

export type DeltaDisplay = DeltaDisplayContents | DeltaDisplayContents[];

interface DeltaDisplayContents {
  color: FloatingTextVariant | null;
  value: number | string;
}

export interface DeltaReserve {
  delta?: DeltaDisplay;
  value: number;
}

export type FloatingText = {
  delta: DeltaDisplay;
  key: string;
};

export enum FloatingTextVariant {
  Negative = "text-danger",
  Neutral = "text-muted",
  Positive = "text-success",
}

export enum UIAttachment {
  Above,
  Below,
}

export enum UISize {
  Normal,
  Tiny,
}

export enum UIVariant {
  Outline = "outline-dark",
  Primary = "dark",
  Secondary = "secondary",
}
