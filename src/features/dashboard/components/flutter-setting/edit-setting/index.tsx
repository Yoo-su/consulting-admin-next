import { FlutterRowInfo, FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';
import { Stack } from '@mui/material';
import BasicForm from '../basic-form';

export type EditSettingProps = {
  settingList: FlutterSetting | FlutterRowInfo | FlutterRowInfo[] | undefined;
};

const EditSetting = ({ settingList }: EditSettingProps) => {
  return (
    <>
      {settingList && (
        <Stack spacing={3}>
          {Array.isArray(settingList) ? (
            settingList.map((item: FlutterRowInfo) => (
              <BasicForm key={item.RowIdx} basicKey={item.Title} item={item} subMenu={item.level > 0} />
            ))
          ) : (
            <BasicForm item={settingList as FlutterRowInfo} subMenu={(settingList as FlutterRowInfo).level > 0} />
          )}
        </Stack>
      )}
    </>
  );
};

export default EditSetting;
