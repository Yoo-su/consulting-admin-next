export type BrowserItem = {
  name: string;
  path: string;
  size: number;
  lastModified: string;
  isDirectory: boolean;
  contentType?: string;
};

export type SortOption = {
  title: string;
  keyAttribute: keyof BrowserItem;
  sortFunction: (a: BrowserItem, b: BrowserItem) => number;
};
