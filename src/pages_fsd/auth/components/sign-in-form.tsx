'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { useSigninMutation } from '../hooks';

const schema = zod.object({
  userID: zod.string().min(1, { message: '사용자 ID를 입력해주세요' }).max(20, { message: '20자 이내로 입력해주세요' }),
  userPassword: zod.string().min(1, { message: '패스워드를 입력해주세요' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  userID: '',
  userPassword: '',
} satisfies Values;

export const SignInForm = () => {
  const { isPending, mutate, isSuccess } = useSigninMutation();

  const [showPassword, setShowPassword] = useState<boolean>();

  const {
    control,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = () => {
    mutate({
      userID: watch('userID'),
      userPassword: watch('userPassword'),
    });
  };

  return (
    <Stack spacing={4} sx={{ mt: 8 }}>
      <Stack spacing={1}>
        <Typography variant="h4" fontSize={28}>
          관리자 로그인
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="userID"
            render={({ field }) => (
              <FormControl error={Boolean(errors.userID)}>
                <InputLabel>User ID</InputLabel>
                <OutlinedInput {...field} label="User ID" type="text" disabled={isPending || isSuccess} />
                {errors.userID ? <FormHelperText>{errors.userID.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="userPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.userPassword)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  autoComplete={'off'}
                  disabled={isPending || isSuccess}
                  endAdornment={
                    showPassword ? (
                      <VisibilityIcon
                        cursor="pointer"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        cursor="pointer"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.userPassword ? <FormHelperText>{errors.userPassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button
            disabled={isPending || isSuccess}
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#2C4059',
              '&:hover': {
                bgcolor: '#2c4059',
              },
            }}
          >
            로그인
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
