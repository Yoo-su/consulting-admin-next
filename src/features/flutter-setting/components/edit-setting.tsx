import { Stack } from '@mui/material';

import BasicForm from '../components/basic-form';
import { FlutterRowInfo, FlutterSetting, Path } from '../models';

export type EditSettingProps = {
  settingList: FlutterSetting | FlutterRowInfo | FlutterRowInfo[] | undefined;
  path: Path;
  isDisabled: boolean;
};

const EditSetting = ({ settingList, path, isDisabled }: EditSettingProps) => {
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

export default EditSetting;
