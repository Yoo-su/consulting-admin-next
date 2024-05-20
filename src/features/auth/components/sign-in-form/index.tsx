'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useSigninMutation } from '../../hooks/tanstack/use-sign-in-mutation';

const schema = zod.object({
  userID: zod.string().min(1, { message: '사용자 ID를 입력해주세요' }).max(20, { message: '20자 이내로 입력해주세요' }),
  password: zod.string().min(1, { message: '패스워드를 입력해주세요' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  userID: 'chess',
  password: '1234',
} satisfies Values;

const SignInForm = () => {
  const { isPending, mutate } = useSigninMutation();

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
      password: watch('password'),
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
                <OutlinedInput {...field} label="User ID" type="text" />
                {errors.userID ? <FormHelperText>{errors.userID.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
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
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button
            disabled={isPending}
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

export default SignInForm;
