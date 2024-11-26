import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

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
