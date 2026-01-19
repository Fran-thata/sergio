import { ReactNode } from 'react';

export interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  variant?: 'light' | 'dark' | 'gray';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface AthleteProps {
  name: string;
  title: string;
  description: string;
  image?: string;
}