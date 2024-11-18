import { BrowserItem, SortOption } from '../models';

export const BROWSER_SORT_OPTIONS: SortOption[] = [
  {
    title: '최신순',
    keyAttribute: 'lastModified',
    sortFunction: (a: BrowserItem, b: BrowserItem) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime(),
  },
  {
    title: '이름순',
    keyAttribute: 'name',
    sortFunction: (a: BrowserItem, b: BrowserItem) =>
      a.name.localeCompare(b.name),
  },
];
