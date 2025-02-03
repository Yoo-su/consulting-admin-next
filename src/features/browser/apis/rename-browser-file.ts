import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export type RenameBrowserFileProps = {
  oldName: string;
  newName: string;
};
export const renameBrowserFile = async ({ oldName, newName }: RenameBrowserFileProps) => {
  const { data } = await apiInstance.post(API_URLS.dashboard.renameBrowserFile, {
    fileName: oldName,
    newFileName: newName,
  });
  return data;
};
