import {
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Stack,
  Typography,
  FormGroup,
  Box,
  Select,
  ButtonGroup,
  Button,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  InputAdornment,
  outlinedInputClasses,
} from '@mui/material';
import { useState, KeyboardEvent, ChangeEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useOutsideClick } from '@/shared/hooks/use-outside-click';
import { FlutterRowInfo } from '@/features/dashboard/types/flutter-setting.type';
import BooleanForm from '../basic-form/boolean-form';
import ListOrderForm from '../basic-form/list-order-form';
import MapForm from '../basic-form/map-form';

const Options = [
  { label: '소그룹', value: 'object' },
  { label: '체크박스', value: 'boolean' },
  { label: '선택박스', value: 'select' },
  { label: '순서리스트', value: 'list-order' },
  { label: '텍스트', value: 'string' },
  { label: 'item/value 테이블', value: 'map' },
];

const TextFieldClass = {
  '& .MuiInputBase-input': {
    padding: '.3rem .5rem',
  },
  '& .MuiInputLabel-shrink': {
    top: 0,
  },
  // '& label.Mui-focused': {
  //   color: 'black',
  // },
  // [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
  //   color: 'black',
  // },
  // [`& .${outlinedInputClasses.notchedOutline}`]: {
  //   color: 'black',
  // },
};
const TitleClass = {
  fontSize: '1rem',
  lineHeight: '1.5',
  letterSpacing: '0.00938em',
};
const DescriptionClass = {
  fontFamily: '__Nanum_Gothic_ff4244 ,__Nanum_Gothic_Fallback_ff4244',
  fontWeight: '400',
  fontSize: '0.75rem',
  lineHeight: '1.66',
  letterSpacing: '0.03333em',
};

type SettingForm = Pick<
  FlutterRowInfo,
  'Category' | 'Title' | 'KoreanTitle' | 'Type' | 'Description' | 'DefaultValue' | 'children'
>;

const AddSetting = ({ category }: { category: string }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [options, setOptions] = useState('');
  const [form, setForm] = useState<SettingForm>({
    Category: category,
    Title: '',
    KoreanTitle: '',
    Type: '',
    Description: '',
    DefaultValue: '',
    children: [],
  });

  // const inputRef = useOutsideClick(() => {
  //   setIsAdd(false);
  // });

  const handleIsAdd = () => {
    setIsAdd(!isAdd);
  };
  const handleInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Enter');
      // Add category
      setIsAdd(false);
    }
  };
  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(event.target.value);
    setForm({ ...form, Type: event.target.value });
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Stack sx={{ paddingTop: '1rem' }} spacing={2}>
      {isAdd && (
        <Stack spacing={1}>
          <Stack
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            sx={{
              paddingBottom: '.5rem',
            }}
          >
            <TextField
              select
              size="small"
              label="설정"
              sx={{
                minWidth: '15%',
                ...TextFieldClass,
                '& .MuiInputLabel-root': {
                  ...TitleClass,
                  top: '-.3rem',
                },
              }}
              onChange={handleSelect}
            >
              {Options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="body1">추가</Typography>
          </Stack>

          <FormGroup sx={{ display: 'flex', gap: 1 }}>
            <Stack direction={'row'} spacing={1} sx={{ paddingBottom: '1px' }}>
              <TextField
                size="small"
                label="제목"
                name="Title"
                sx={{
                  width: '40%',

                  '& .MuiInputBase-root': {
                    ...TitleClass,
                    fontWeight: 'bolder',
                  },
                  '& .MuiInputLabel-root': {
                    ...TitleClass,
                    fontWeight: 'bolder',
                    top: '-.3rem',
                  },
                  ...TextFieldClass,
                }}
                value={form.Title}
                onChange={handleChange}
              />
              <TextField
                size="small"
                fullWidth
                label="한제"
                name="KoreanTitle"
                sx={{
                  '& .MuiInputBase-root': {
                    ...TitleClass,
                    color: '#757575',
                  },
                  '& .MuiInputLabel-root': {
                    ...TitleClass,
                    // color: '#757575',
                    top: '-.3rem',
                  },
                  ...TextFieldClass,
                }}
                value={form.KoreanTitle}
                onChange={handleChange}
              />
            </Stack>
            <TextField
              size="small"
              fullWidth
              label="설명"
              name="Description"
              sx={{
                '& .MuiInputBase-root': {
                  ...DescriptionClass,
                },
                '& .MuiInputLabel-root': {
                  top: '-.3rem',
                  ...DescriptionClass,
                },
                ...TextFieldClass,
              }}
              value={form.Description}
              onChange={handleChange}
            />
            <Box sx={{ paddingTop: '.3rem' }}>
              {(options === 'string' || options === 'double') && (
                <TextField size="small" fullWidth label="Value"></TextField>
              )}
              {options === 'boolean' && <BooleanForm />}
              {options === 'select' && <>select options</>}
              {options === 'map' && <MapForm />}
            </Box>
          </FormGroup>
        </Stack>
      )}
      <Stack spacing={1}>
        <Divider variant="middle" />
        <Stack>
          {!isAdd && (
            <Tooltip title="설정 카테고리 추가" placement="top">
              <IconButton sx={{ borderRadius: '5%', backgroundColor: '#FAFAFA' }} onClick={handleIsAdd}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          {isAdd && (
            <Stack direction={'row'} spacing={1}>
              <Tooltip title="설정 카테고리 추가" placement="top">
                <IconButton sx={{ borderRadius: '5%', backgroundColor: '#FAFAFA', width: '79%' }} onClick={handleIsAdd}>
                  <Typography variant="overline">추가하기</Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="설정 카테고리 추가" placement="top">
                <IconButton
                  sx={{ borderRadius: '5%', border: '1px solid #FAFAFA', width: '20%' }}
                  onClick={handleIsAdd}
                >
                  <Typography variant="overline">취소</Typography>
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddSetting;
