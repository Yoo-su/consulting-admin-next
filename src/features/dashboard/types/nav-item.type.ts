import { ComponentType } from 'react';

export type NavItemType = {
  navkey: string;
  title: string;
  href: string;
  Icon: ComponentType;
};

export type NavItemGroup = {
  title: string;
  items: NavItemType[];
  isExpanded?: boolean;
};
