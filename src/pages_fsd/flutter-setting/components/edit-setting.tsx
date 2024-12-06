import { Stack } from '@mui/material';

import { FlutterRowInfo, FlutterSetting, Path } from '../models';
import { BasicForm } from './basic-form';

export type EditSettingProps = {
  settingList: FlutterSetting | FlutterRowInfo | FlutterRowInfo[] | undefined;
  path: Path;
  isDisabled: boolean;
};
export const EditSetting = ({
  settingList,
  path,
  isDisabled,
}: EditSettingProps) => {
  const isSub = Array.isArray(settingList) && settingList[0]?.level > 1;
  return (
    <>
      {settingList && (
        <Stack spacing={isSub ? 1 : 5}>
          {Array.isArray(settingList) ? (
            settingList.map((item: FlutterRowInfo, index: number) => (
              <BasicForm
                key={item.RowIdx}
                basicKey={item.Title}
                item={item}
                path={[...path, 'children', index]}
                index={index}
                isDisabled={isDisabled}
              />
            ))
          ) : (
            <BasicForm
              item={settingList as FlutterRowInfo}
              path={path}
              index={0}
              isDisabled={isDisabled}
            />
          )}
        </Stack>
      )}
    </>
  );
};
