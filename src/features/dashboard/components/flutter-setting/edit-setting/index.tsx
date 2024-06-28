import { FlutterRowInfo, FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';
import { Stack } from '@mui/material';
import BasicForm from '../basic-form';
import { Path } from '../types/flutter-setting-form.type';

export type EditSettingProps = {
  settingList: FlutterSetting | FlutterRowInfo | FlutterRowInfo[] | undefined;
  path: Path;
};

const EditSetting = ({ settingList, path }: EditSettingProps) => {
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
              />
            ))
          ) : (
            <BasicForm item={settingList as FlutterRowInfo} path={path} index={0} />
          )}
        </Stack>
      )}
    </>
  );
};

export default EditSetting;
