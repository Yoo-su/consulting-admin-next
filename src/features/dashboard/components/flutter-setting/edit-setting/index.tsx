import { FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

type EditSettingProps = {
  settingList: any;
};

const EditSetting = ({ settingList }: EditSettingProps) => {
  const isSimpleString = typeof settingList === 'string';
  const isBoolean = (value: string | boolean) => typeof value === 'boolean';

  return (
    <>
      {!settingList ? (
        ''
      ) : (
        <Stack spacing={3}>
          {isSimpleString ? (
            <Stack direction={'column'}>
              <Typography variant="body2" sx={{ paddingBottom: '1px' }}>
                value :
              </Typography>
              <TextField value={settingList.toString()} size="small" />
            </Stack>
          ) : (
            Object.keys(settingList).map((item) => {
              if (typeof settingList[item] === 'object') {
                return (
                  <Stack key={item} sx={{ paddingBottom: '1rem' }}>
                    <Typography variant={'subtitle1'}>{item}</Typography>
                    <EditSetting settingList={settingList[item]} />
                  </Stack>
                );
              }
              return (
                <Stack key={item} direction={'column'}>
                  <Typography variant="body2" sx={{ paddingBottom: '1px' }}>
                    {item}:
                  </Typography>
                  {isBoolean(settingList[item]) ? (
                    <FormControl size="small">
                      <Select value={settingList[item]}>
                        <MenuItem value={'true'}>true</MenuItem>
                        <MenuItem value={'false'}>false</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      value={settingList[item] ? settingList[item].toString() : '설정되지 않음'}
                      size="small"
                    />
                  )}
                </Stack>
              );
            })
          )}
        </Stack>
      )}
    </>
  );
};

export default EditSetting;
