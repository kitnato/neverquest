import React from "react";

export default function WithIcon({ icon, alt, children, className = "" }) {
  return (
    <div className={`d-flex align-items-center ${className}`}>
      <img src={icon} alt={alt} className="mr-2 nq-icon" />

      {children}
    </div>
  );
}
