import ProgressBar from "react-bootstrap/ProgressBar";

import { UIAttachment, UISize, UIVariant } from "neverquest/env.d";

export default function Progress({
  attached,
  label = "",
  size = UISize.Normal,
  value,
  variant,
}: {
  attached?: UIAttachment;
  label?: string;
  size?: UISize;
  value: number;
  variant: UIVariant;
}) {
  const style: Partial<{
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
    height: number;
  }> = size === UISize.Tiny ? { height: 10 } : {};

  switch (attached) {
    case UIAttachment.Above:
      style.borderTopLeftRadius = 0;
      style.borderTopRightRadius = 0;
      break;
    case UIAttachment.Below:
      style.borderBottomLeftRadius = 0;
      style.borderBottomRightRadius = 0;
      break;
    default:
      break;
  }

  return (
    <div className="position-relative w-100">
      <ProgressBar now={value} style={style} variant={variant} />

      {size === UISize.Normal && (
        <small
          className="position-absolute text-light"
          style={{
            letterSpacing: 1,
            right: "50%",
            textShadow:
              "-1px 1px 1px #212529, 1px 1px 1px #212529, 1px -1px 1px #212529, -1px -1px 1px #212529",
            top: 0,
            transform: "translateX(50%)",
          }}
        >
          {label}
        </small>
      )}
    </div>
  );
}
