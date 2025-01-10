import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export type UploadMutationType = UseMutationResult<
  AxiosResponse<any, any>,
  Error,
  FormData,
  unknown
>;

export type BrowserItem = {
  name: string;
  path: string;
  size: number;
  lastModified: string;
  isDirectory: boolean;
  contentType?: string;
};

export type PopoverOption = {
  title: string;
  handleClickMenu: any;
};

export type SortOption = {
  title: string;
  keyAttribute: keyof BrowserItem;
  sortFunction: (a: BrowserItem, b: BrowserItem) => number;
};

export type BrowserOption = {
  showCurrentPath: boolean;
  appendDirectory: boolean;
  isDropZone: boolean;
  itemAppearance: 'basic' | 'card';
  customPopoverMenus: PopoverOption[];
};

export type BrowserOptionOptional = {
  showCurrentPath?: boolean;
  appendDirectory?: boolean;
  isDropZone?: boolean;
  itemAppearance?: 'basic' | 'card';
  customPopoverMenus?: PopoverOption[];
};
