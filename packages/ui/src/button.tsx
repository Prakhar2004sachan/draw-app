"use client";

import { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  title: string;
  className?: string;
  showIcon: boolean;
  onClickFunc?: () => void;
}

export const Button = ({
  icon,
  className,
  onClickFunc,
  showIcon,
  title,
}: ButtonProps) => {
  return (
    <button className={className} onClick={onClickFunc}>
      {showIcon ? icon : null}
      {title}
    </button>
  );
};
