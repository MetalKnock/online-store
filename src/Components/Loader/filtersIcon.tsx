import React from 'react';

interface FiltersIconProps {
  className: string;
  handleClick: () => void;
}

function FiltersIcon({ className, handleClick }: FiltersIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
      onClick={handleClick}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M4 5h6m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0h6M4 12h12m0 0a2 2 0 104 0 2 2 0 00-4 0zm-8 7h12M8 19a2 2 0 10-4 0 2 2 0 004 0z"
      />
    </svg>
  );
}

export default FiltersIcon;
