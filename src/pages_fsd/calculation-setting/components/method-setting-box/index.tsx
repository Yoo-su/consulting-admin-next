import { Stack, styled } from '@mui/material';

import { useGetCalcMethodQuery } from '../../hooks';
import CalcMethodAccordion from './calc-method-accordion';

type MethodSettingBoxProps = {
  serviceID: string;
};
const MethodSettingBox = ({ serviceID }: MethodSettingBoxProps) => {
  const { data } = useGetCalcMethodQuery(serviceID);

  return (
    <StyledBox>
      {data?.map((calcMethod) => (
        <CalcMethodAccordion
          key={calcMethod.CalcMethodID}
          calcMethod={calcMethod}
        />
      ))}
    </StyledBox>
  );
};

const StyledBox = styled(Stack)({
  flexDirection: 'column',
});

export default MethodSettingBox;
