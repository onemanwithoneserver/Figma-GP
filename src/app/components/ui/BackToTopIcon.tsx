import React from "react";

export function BackToTopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={props.width || 28}
      height={props.height || 28}
      {...props}
    >
      <polyline points="18 15 12 9 6 15" />
      <line x1="12" y1="9" x2="12" y2="21" />
    </svg>
  );
}
