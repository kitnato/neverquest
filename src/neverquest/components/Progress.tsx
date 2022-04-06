import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ProgressBar from "react-bootstrap/ProgressBar";
import Tooltip from "react-bootstrap/Tooltip";

import { UIAttachment, UISize, UIVariant } from "neverquest/env.d";

export default function Progress({
  attached,
  label,
  size = UISize.Normal,
  value,
  variant,
}: {
  attached?: UIAttachment;
  label: string;
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
  }

  return (
    <div className="position-relative w-100">
      {size === UISize.Normal && (
        <>
          <ProgressBar now={value} style={style} variant={variant} />

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
        </>
      )}

      {size === UISize.Tiny && (
        <OverlayTrigger overlay={<Tooltip>{label}</Tooltip>} placement="bottom">
          <ProgressBar now={value} style={style} variant={variant} />
        </OverlayTrigger>
      )}
    </div>
  );
}
