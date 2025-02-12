import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div className={twMerge(`w-[90%] mx-auto max-w-screen-xl`, className)}>
      {children}
    </div>
  );
}
