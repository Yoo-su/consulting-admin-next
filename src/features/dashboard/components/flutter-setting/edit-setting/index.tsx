import { FlutterRowInfo, FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';
import { Stack } from '@mui/material';
import BasicForm from '../basic-form';
import { Path } from '../types/flutter-setting-form.type';

export type EditSettingProps = {
  settingList: FlutterSetting | FlutterRowInfo | FlutterRowInfo[] | undefined;
  path: Path;
  isDisabled: boolean;
};

const EditSetting = ({ settingList, path, isDisabled }: EditSettingProps) => {
  return (
    <>
      {settingList && (
        <Stack spacing={3}>
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
            <BasicForm item={settingList as FlutterRowInfo} path={path} index={0} isDisabled={isDisabled} />
          )}
        </Stack>
      )}
    </>
  );
};

export default EditSetting;
