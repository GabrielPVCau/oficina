import { ReactNode } from 'react';
import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const Section = ({ children, className, id, fullWidth = false }: SectionProps) => {
  return (
    <section id={id} className={cn("py-16 md:py-24 relative overflow-hidden", className)}>
      <div className={cn("mx-auto px-4 md:px-6", fullWidth ? "w-full" : "max-w-7xl")}>
        {children}
      </div>
    </section>
  );
};
