import React from 'react';
import { SectionProps } from '../types';

export const Section: React.FC<SectionProps> = ({ id, className = '', children, variant = 'light' }) => {
  const getBgColor = () => {
    switch (variant) {
      case 'dark':
        return 'bg-brand-dark text-white';
      case 'gray':
        return 'bg-gray-100 dark:bg-brand-charcoal text-gray-900 dark:text-gray-100';
      case 'light':
      default:
        return 'bg-white dark:bg-brand-dark text-gray-900 dark:text-gray-100';
    }
  };

  return (
    <section 
      id={id} 
      className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${getBgColor()} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};