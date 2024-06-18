import { Checkbox, FormControlLabel, FormGroup, TextField, styled } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';

const StyledTextField = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-input': {
    fontFamily: '__Gowun_Dodum_8e1aab, __Gowun_Dodum_Fallback_8e1aab',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '0.00938em',
    padding: 0,
  },
});

const BooleanForm = ({ item }: Partial<FormItemProps>) => {
  const { transferDefaultValue, Description } = item ?? {};

  const [checkValue, setCheckValue] = useState<boolean>(transferDefaultValue ?? false);
  const handleBooleanChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckValue(event.target.checked);
  };

  return (
    <>
      <FormGroup sx={{ paddingLeft: '.5rem' }}>
        <FormControlLabel
          label={Description ? Description : <StyledTextField variant="standard" />}
          control={<Checkbox disableRipple checked={checkValue} onChange={handleBooleanChange} />}
          sx={{
            '& .MuiButtonBase-root': {
              padding: '0 .3rem 0 .5rem',
            },
            '& .Mui-checked': {
              color: 'black !important',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.2rem',
              paddingTop: '2px',
            },
            '& .MuiTypography-root': {
              fontSize: '.9rem',
              width: '100%',
            },
          }}
        />
      </FormGroup>
    </>
  );
};
export default BooleanForm;
