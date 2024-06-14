import { FlutterRowInfo, FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';

type EditSettingProps = {
  settingList: FlutterSetting | FlutterRowInfo | FlutterRowInfo[] | undefined;
  category?: string;
};

type BasicFormProps = {
  basicKey?: string;
  item: FlutterRowInfo;
  subMenu?: boolean;
};

const BasicForm = ({ basicKey, item, subMenu = false }: BasicFormProps) => {
  const { Type, Title, Description, DefaultValue } = item;
  return (
    <Stack key={basicKey} direction={'column'} spacing={subMenu ? 0 : 1}>
      <Stack>
        <Typography
          variant={subMenu ? 'body2' : 'body1'}
          sx={{ paddingBottom: '1px', fontWeight: subMenu ? 'bold' : 'bolder' }}
        >
          {Title}
        </Typography>
        {Type !== 'boolean' && <Typography variant={'caption'}>{Description}</Typography>}
      </Stack>
      {Type === 'object' ? (
        <EditSetting settingList={item.children} category={item.Category} />
      ) : Type === 'boolean' ? (
        <>
          <FormGroup sx={{ paddingLeft: '.5rem' }}>
            <FormControlLabel
              label={item.Description}
              control={<Checkbox disableRipple />}
              sx={{
                '& .MuiButtonBase-root': {
                  padding: '0 .3rem 0 .5rem',
                },
                '& .Mui-checked': {
                  color: 'black',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.2rem',
                  paddingTop: '2px',
                },
                '& .MuiTypography-root': {
                  fontSize: '.9rem',
                },
              }}
            />
          </FormGroup>
        </>
      ) : (
        <TextField value={DefaultValue ? DefaultValue.toString() : '설정되지 않음'} size="small" />
      )}
    </Stack>
  );
};
const EditSetting = ({ settingList, category }: EditSettingProps) => {
  console.log(category, settingList);
  return (
    <>
      {settingList && (
        <Stack spacing={3}>
          {Array.isArray(settingList) ? (
            settingList.map((item: FlutterRowInfo) => (
              <BasicForm key={item.RowIdx} basicKey={item.Title} item={item} subMenu={category !== item.Category} />
            ))
          ) : (
            <BasicForm item={settingList as FlutterRowInfo} subMenu={category !== settingList.Category} />
          )}
        </Stack>
      )}
    </>
  );
};

export default EditSetting;
