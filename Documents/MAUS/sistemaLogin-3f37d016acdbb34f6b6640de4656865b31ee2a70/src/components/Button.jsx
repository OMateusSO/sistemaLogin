import React from "react";

export default function Button({text, className, ...props}) {
  return (
    <div>
      <button {...props} className={className}>
        {text}
      </button>
    </div>
  );
}
