import { FlutterRowInfo } from '@/features/dashboard/types/flutter-setting.type';
import { Autocomplete, Chip, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import EditSetting from '../edit-setting';
import BooleanForm from './boolean-form';
import SelectForm from './select-form';
import ListOrderForm from './list-order-form';

type BasicFormProps = {
  basicKey?: string;
  item: FlutterRowInfo;
  subMenu?: boolean;
};

const BasicForm = ({ basicKey, item }: BasicFormProps) => {
  const { Type, Title, KoreanTitle, Description, transferDefaultValue, level, children } = item;
  const subMenu = level > 0;

  return (
    <Stack key={basicKey} direction={'column'} spacing={subMenu ? 0 : 1}>
      <Stack sx={{ paddingTop: level > 1 ? '.5rem' : '' }}>
        <Stack direction={'row'} spacing={1} sx={{ paddingBottom: '1px' }}>
          <Typography variant={subMenu ? 'body2' : 'body1'} sx={{ fontWeight: subMenu ? 'bold' : 'bolder' }}>
            {Title}
          </Typography>
          <Typography variant={subMenu ? 'body2' : 'body1'} sx={{ color: '#757575' }}>
            {KoreanTitle}
          </Typography>
        </Stack>
        {Type !== 'boolean' && <Typography variant={'caption'}>{Description}</Typography>}
      </Stack>
      {Type === 'object' ? (
        <EditSetting settingList={children} />
      ) : Type === 'boolean' ? (
        <BooleanForm item={item} />
      ) : Type === 'select' ? (
        <SelectForm item={item} />
      ) : Type === 'list-order' ? (
        <ListOrderForm item={item} />
      ) : (
        <TextField
          value={transferDefaultValue}
          size="small"
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '.9rem',
            },
          }}
        />
      )}
    </Stack>
  );
};

export default BasicForm;
