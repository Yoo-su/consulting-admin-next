import { MouseEvent } from 'react';
import {
  copyText,
  getPrevLocation,
  getPWADownloadUrl,
  isCurrentServiceType,
} from '../../services';
import { AppPWATextField } from './app-pwa-text-field';

type AppPWABodyProps = {
  univEngName: string | undefined;
  schoolYear: string | undefined;
  isSusi: string | undefined;
};

export const AppPWABody = ({
  univEngName,
  schoolYear,
  isSusi,
}: AppPWABodyProps) => {
  // 현재 서비스 중인지 확인
  const isCurrentService = isCurrentServiceType(schoolYear, isSusi);
  const prevLocation = getPrevLocation({
    isCurrentService,
    schoolYear,
    isSusi,
  });
  const [testUrl, realUrl] = getPWADownloadUrl({ prevLocation, univEngName });

  const handleClickCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const id = event.currentTarget.id;
    const copiedText = id === 'test' ? testUrl : realUrl;
    await copyText(copiedText);
  };

  return (
    <>
      <AppPWATextField
        title="Test"
        url={testUrl}
        id="test"
        handleClick={handleClickCopy}
      />
      {isCurrentService && (
        <AppPWATextField
          title="Real"
          url={realUrl}
          id="real"
          handleClick={handleClickCopy}
        />
      )}
    </>
  );
};
