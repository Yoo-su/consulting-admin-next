import { memo, useCallback } from 'react';

import { useQueueStore } from '../models';
import { QueueFile } from './queue-file';

/**
 * List Rendering을 담당하는 컴포넌트
 * 브라우저 아이템(디렉토리, 파일)과 Queue를 렌더링한다.
 */
type QueueRendererProps = {
  handleRemoveInputFile: (fileName: string) => void;
};
export const QueueRenderer = memo(({ handleRemoveInputFile }: QueueRendererProps) => {
  const browserQueue = useQueueStore((state) => state.browserQueue);
  const removeBrowserQueueFile = useQueueStore((state) => state.removeBrowserQueueFile);

  const handleRemoveFile = useCallback((fileName: string) => {
    removeBrowserQueueFile(fileName);
    handleRemoveInputFile(fileName);
  }, []);

  return (
    <>
      {/* render queue items */}
      {browserQueue.map((item) => (
        <QueueFile key={item.name} name={item.name} type={item.type} handleRemoveFile={handleRemoveFile} />
      ))}
    </>
  );
});
QueueRenderer.displayName = 'QueueRenderer';
