'use client';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import AddIcon from '@mui/icons-material/Add';

const schema = zod.object({
  serviceID: zod.string({ message: '서비스 ID를 입력해주세요' }),
  serviceYear: zod.string({ message: '서비스년도를 입력해주세요' }),
  serviceType: zod.string({ message: '서비스 유형을 입력해주세요' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  serviceID: '',
  serviceYear: '',
  serviceType: '수시',
} satisfies Values;

const AddServiceForm = () => {
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <form>
        <Stack direction={'row'} alignItems={'flex-end'} spacing={3}>
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
                <OutlinedInput type="text" size="small" />
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
                <OutlinedInput type="text" size="small" />
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
                <OutlinedInput type="text" size="small" />
              </FormControl>
            )}
          />
          <Button variant="contained">
            <AddIcon />
            {upmd && (
              <Typography
                variant="button"
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                서비스 추가
              </Typography>
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddServiceForm;
