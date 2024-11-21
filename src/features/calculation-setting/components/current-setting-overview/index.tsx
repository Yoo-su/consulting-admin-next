import { Stack } from '@mui/material';

import ConfigPreviewCard from './config-preview-card';
import ConversionTablePreviewCard from './conversion-table-preview-card';
import MethodPreviewCard from './method-preview-card';

type CurrentSettingOverviewProps = {
  serviceID: string;
};
const CurrentSettingOverview = ({ serviceID }: CurrentSettingOverviewProps) => {
  return (
    <Stack direction={'row'} gap={2} my={4}>
      <ConfigPreviewCard serviceID={serviceID} />
      <MethodPreviewCard serviceID={serviceID} />
      <ConversionTablePreviewCard serviceID={serviceID} />
    </Stack>
  );
};

export default CurrentSettingOverview;
