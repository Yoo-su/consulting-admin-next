import { API_URLS } from '@/shared/constants';
import { RealURL, TestURL } from '../constants';
import { AppHistory } from '../models';

export const getAppDownloadUrl = (history: AppHistory) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${API_URLS.dashboard.getAppDownloadUrl}/${history.serviceID}/${history.osType}/${history.version}`;
};

export const getPWADownloadUrl = ({
  prevLocation,
  univEngName,
}: {
  prevLocation: string;
  univEngName: string | undefined;
}): string[] => [
  `${TestURL}${prevLocation}/${univEngName}-pwa.html`,
  `${RealURL}${prevLocation}/${univEngName}-pwa.html`,
];
