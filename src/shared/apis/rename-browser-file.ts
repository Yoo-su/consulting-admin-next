import { API_URLS } from '../constants';
import { apiInstance } from '../plugin/axios';

export type RenameBrowserFileProps = {
  oldName: string;
  newName: string;
};
export const renameBrowserFile = async ({
  oldName,
  newName,
}: RenameBrowserFileProps) => {
  return await apiInstance.post(API_URLS.dashboard.renameBrowserFile, {
    fileName: oldName,
    newFileName: newName,
  });
};
