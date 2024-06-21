import { Checkbox, FormControlLabel, FormGroup, TextField, styled } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { getConvertedValue } from '@/shared/services/get-converted-value';
import { useSetFlutterSettingMutation } from '@/features/dashboard/hooks/tanstack/use-set-flutter-setting-mutation';

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
  const { currentService } = useUnivService();
  const { transferDefaultValue = false, Description, RowValue = null, RowIdx = null } = item ?? {};

  const [checkValue, setCheckValue] = useState<boolean>(RowValue ? getConvertedValue(RowValue) : transferDefaultValue);
  const [inputValue, setInputValue] = useState('');

  const { mutateAsync } = useSetFlutterSettingMutation();

  const handleBooleanChange = (event: ChangeEvent<HTMLInputElement>) => {
    const booleanValue = event.target.checked;
    setCheckValue(booleanValue);
    if (RowIdx !== null) {
      mutateAsync({
        serviceID: currentService!.serviceID,
        RowIdx,
        RowValue: booleanValue.toString(),
      });
    }
  };
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <FormGroup sx={{ paddingLeft: '.5rem' }}>
        <FormControlLabel
          label={
            Description ? Description : <StyledTextField variant="standard" onChange={handleInput} value={inputValue} />
          }
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
