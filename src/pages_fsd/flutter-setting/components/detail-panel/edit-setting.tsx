import { Stack } from '@mui/material';

import { FlutterRowInfo, FlutterSetting, Path } from '../../models';
import { BasicForm, BasicFormArray } from '../detail-panel-basic';

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
  if (!settingList) return null;

  const spacing =
    Array.isArray(settingList) && settingList[0]?.level > 1 ? 1 : 5;

  return (
    <>
      {
        <Stack spacing={spacing}>
          {Array.isArray(settingList) ? (
            <BasicFormArray
              settingList={settingList}
              path={path}
              isDisabled={isDisabled}
            />
          ) : (
            <BasicForm
              item={settingList as FlutterRowInfo}
              path={path}
              index={0}
              isDisabled={isDisabled}
            />
          )}
        </Stack>
      }
    </>
  );
};
