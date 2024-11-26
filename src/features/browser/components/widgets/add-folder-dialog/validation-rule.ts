import { RegisterOptions } from 'react-hook-form';

export const directoryNameValidation: RegisterOptions = {
  required: '폴더명을 입력해주세요.',
  maxLength: {
    value: 30,
    message: '최대 30자까지 입력 가능합니다.',
  },
};
