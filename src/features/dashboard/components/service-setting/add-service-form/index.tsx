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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';

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
                <FormLabel>서비스 ID</FormLabel>
                <OutlinedInput type="text" size="small" />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="serviceYear"
            render={({ field }) => (
              <FormControl>
                <FormLabel>서비스 년도</FormLabel>
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
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    oveflow: 'hidden',
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
            <Typography
              variant="button"
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              서비스 추가
            </Typography>
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddServiceForm;
