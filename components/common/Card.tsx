import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-light-bg dark:bg-dark-bg p-6 rounded-lg border border-light-border dark:border-dark-border ${className}`}>
      <h4 className="text-lg font-bold text-light-brand dark:text-dark-brand mb-4">{title}</h4>
      <div>{children}</div>
    </div>
  );
};
