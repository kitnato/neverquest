import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Progress({
  value,
  label,
  variant = "primary",
  className = "",
}) {
  return (
    <div className={`position-relative ${className}`}>
      <ProgressBar now={value} variant={variant} />

      <small
        className="position-absolute text-light"
        style={{
          textShadow:
            "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
          top: 0,
          right: "50%",
          transform: "translateX(50%)",
        }}
      >
        {label}
      </small>
    </div>
  );
}
