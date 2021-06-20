import React from "react";

import { TRANSPARENT_PIXEL } from "utilities/constants";

export default function WithIcon({
  icon = TRANSPARENT_PIXEL,
  alt = "",
  children,
  className = "",
}) {
  return (
    <div className={`d-flex align-items-center ${className}`}>
      <img
        src={icon}
        alt={alt}
        className="mr-2"
        style={{
          width: icon === TRANSPARENT_PIXEL ? 0 : 40,
          height: 40,
        }}
      />

      {children}
    </div>
  );
}
