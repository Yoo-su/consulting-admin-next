import { Box, Checkbox, FormControlLabel, FormGroup, TextField, styled } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { getConvertedValue } from '@/shared/services/get-converted-value';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';

const BooleanForm = ({
  item,
  path,
  handleEdit,
  isDisabled,
}: Partial<Pick<FormItemProps, 'item'>> & Omit<FormItemProps, 'item'>) => {
  const { transferDefaultValue = false, Description, RowValue = null, RowIdx = null } = item ?? {};
  const { addToEditedList } = useFlutterSetting();
  const [checkValue, setCheckValue] = useState<boolean>(RowValue ? getConvertedValue(RowValue) : transferDefaultValue);
  const [inputValue, setInputValue] = useState('');

  const handleBooleanChange = (event: ChangeEvent<HTMLInputElement>) => {
    const booleanValue = event.target.checked;
    setCheckValue(booleanValue);
    if (RowIdx !== null) {
      handleEdit(path, booleanValue.toString());
      addToEditedList({
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
      <FormGroup
        sx={{
          paddingLeft: '.5rem',
          '& .MuiFormControlLabel-label.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.77) !important',
          },
        }}
      >
        <FormControlLabel
          label={
            Description ? (
              <Box component="span">{Description}</Box>
            ) : (
              <StyledTextField variant="standard" onChange={handleInput} value={inputValue} />
            )
          }
          control={
            <Checkbox
              disableRipple
              checked={checkValue}
              onChange={handleBooleanChange}
              disabled={isDisabled}
              sx={{ color: isDisabled ? '#FAFAFA' : 'rgba(0, 0, 0, 0.87) !important' }}
            />
          }
          sx={CheckBoxClass}
        />
      </FormGroup>
    </>
  );
};
export default BooleanForm;

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

const CheckBoxClass = {
  '& .MuiButtonBase-root': {
    padding: '0 .3rem 0 .5rem',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
    paddingTop: '2px',
  },
  '& .MuiTypography-root': {
    fontSize: '.9rem',
    width: '100%',
  },
};
