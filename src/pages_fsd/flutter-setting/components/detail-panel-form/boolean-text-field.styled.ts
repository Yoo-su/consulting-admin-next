import styled from '@emotion/styled';
import { TextField } from '@mui/material';

// add setting 용
export const StyledBooleanTextField = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-input': {
    fontFamily: '__Gowun_Dodum_8e1aab, __Gowun_Dodum_Fallback_8e1aab',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '0.00938em',
    padding: 0,
  },
});
