'use client';

import Accordion from '@mui/material/Accordion';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import AddIcon from '@mui/icons-material/Add';

const schema = zod.object({
  serviceID: zod.string({ message: '서비스 ID를 입력해주세요' }).length(2, { message: '서비스ID 길이를 확인해주세요' }),
  serviceYear: zod
    .string({ message: '서비스년도를 입력해주세요' })
    .length(4, { message: '올바른 서비스년도를 입력해주세요' }),
  serviceType: zod.enum(['수시', '정시'], { message: '수시 또는 정시만 가능합니다' }),
  developer: zod.string({ message: '담당 개발자를 입력하세요' }),
  manager: zod.string({ message: '담당 운영자를 입력하세요' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  serviceID: '',
  serviceYear: '',
  serviceType: '수시',
  developer: '',
  manager: '',
} satisfies Values;

type AddServiceFormProps = {
  univID: string;
};
const AddServiceForm = ({ univID }: AddServiceFormProps) => {
  const {
    control,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const theme = useTheme();
  const upmd = useMediaQuery(theme.breakpoints.up('md'));
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  const onSubmit = () => {};

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="consultingapp-states-content"
        id="consultingapp-states-content"
      >
        <Typography variant="h6">서비스 추가</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={'column'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'flex-start'}>
              <Stack direction={'column'} justifyContent={'flex-start'}>
                <Controller
                  control={control}
                  name="serviceID"
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel
                        sx={{
                          ...(downmd && {
                            fontSize: '14px',
                          }),
                        }}
                      >
                        서비스 ID
                      </FormLabel>
                      <OutlinedInput
                        {...field}
                        type="text"
                        size="small"
                        startAdornment={<InputAdornment position="start">{univID}</InputAdornment>}
                        sx={{
                          '& .MuiInputAdornment-root': {
                            marginRight: 0, // InputAdornment의 marginRight 제거
                          },
                        }}
                      />
                      {errors.serviceID ? (
                        <FormHelperText sx={{ color: '#D32F2F', ml: 0 }}>{errors.serviceID.message}</FormHelperText>
                      ) : (
                        <FormHelperText>&nbsp;</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="serviceYear"
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel
                        sx={{
                          ...(downmd && {
                            fontSize: '14px',
                          }),
                        }}
                      >
                        서비스 년도
                      </FormLabel>
                      <OutlinedInput {...field} type="text" size="small" />
                      {errors.serviceYear ? (
                        <FormHelperText sx={{ color: '#D32F2F', ml: 0 }}>{errors.serviceYear.message}</FormHelperText>
                      ) : (
                        <FormHelperText>&nbsp;</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel
                        sx={{
                          ...(downmd && {
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                          }),
                        }}
                      >
                        서비스 유형(수시/정시)
                      </FormLabel>
                      <OutlinedInput {...field} type="text" size="small" />
                      {errors.serviceType ? (
                        <FormHelperText sx={{ color: '#D32F2F', ml: 0 }}>{errors.serviceType.message}</FormHelperText>
                      ) : (
                        <FormHelperText>&nbsp;</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
              <Stack direction={'column'} justifyContent={'flex-start'}>
                <Controller
                  control={control}
                  name="developer"
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel
                        sx={{
                          ...(downmd && {
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                          }),
                        }}
                      >
                        담당 개발자
                      </FormLabel>
                      <OutlinedInput {...field} type="text" size="small" />
                      {errors.developer ? (
                        <FormHelperText sx={{ color: '#D32F2F', ml: 0 }}>{errors.developer.message}</FormHelperText>
                      ) : (
                        <FormHelperText>&nbsp;</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="manager"
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel
                        sx={{
                          ...(downmd && {
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                          }),
                        }}
                      >
                        담당 운영자
                      </FormLabel>
                      <OutlinedInput {...field} type="text" size="small" />
                      {errors.manager ? (
                        <FormHelperText sx={{ color: '#D32F2F', ml: 0 }}>{errors.manager.message}</FormHelperText>
                      ) : (
                        <FormHelperText>&nbsp;</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
            </Stack>
            <Stack direction={'row'} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                type="submit"
                sx={{ height: 'fit-content' }}
                size={downmd ? 'small' : 'medium'}
              >
                <AddIcon />
              </Button>
            </Stack>
          </form>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddServiceForm;
