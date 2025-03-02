import React from "react";

export const IconButton = ({ Icon, alt, onClick, className, type }) => {
  return (
    <button type={type} className={`icon-button ${className}`} onClick={onClick}>
      <Icon alt={alt} style={{opacity: "50%"}} />
    </button>
  );
};