import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';

const BooleanForm = ({ item }: FormItemProps) => {
  const { transferDefaultValue, Description } = item;

  const [checkValue, setCheckValue] = useState<boolean>(transferDefaultValue);
  const handleBooleanChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckValue(event.target.checked);
  };
  return (
    <>
      <FormGroup sx={{ paddingLeft: '.5rem' }}>
        <FormControlLabel
          label={Description}
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
            },
          }}
        />
      </FormGroup>
    </>
  );
};
export default BooleanForm;
