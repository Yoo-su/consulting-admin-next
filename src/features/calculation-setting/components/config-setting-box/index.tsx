import { Divider, Stack } from '@mui/material';

import { useGetCalcConfigQuery } from '../../hooks';
import CalcConfigAccordion from './calc-config-accordion';
import Header from './header';

type ConfigSettingBoxProps = {
  serviceID: string;
};
const ConfigSettingBox = ({ serviceID }: ConfigSettingBoxProps) => {
  const { data } = useGetCalcConfigQuery(serviceID);

  return (
    <Stack>
      <Header serviceID={serviceID} />
      <Divider sx={{ bgcolor: 'rgba(0,0,0,0.01)', my: 1 }} />
      {data?.map((calcConfigItem) => (
        <CalcConfigAccordion
          key={calcConfigItem.CalcConfigID}
          calcConfig={calcConfigItem}
        />
      ))}
    </Stack>
  );
};

export default ConfigSettingBox;
