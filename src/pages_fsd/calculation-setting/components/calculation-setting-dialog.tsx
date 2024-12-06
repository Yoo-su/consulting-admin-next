import { Dialog, DialogContent } from '@mui/material';
import { useCallback } from 'react';

import { useCalculationSettingStore } from '../models';
import { ConfigSettingBox } from './config-setting-box';
import { ConversionTableSettingBox } from './conversion-table-setting-box';
import { MethodSettingBox } from './method-setting-box';

type CalculationSettingDialogProps = {
  serviceID: string;
};
export const CalculationSettingDialog = ({
  serviceID,
}: CalculationSettingDialogProps) => {
  const {
    dialogType,
    isCalculationSettingDialogOpen,
    closeCalculationSettingDialog,
  } = useCalculationSettingStore();

  const renderContent = useCallback(() => {
    if (dialogType === 'config')
      return <ConfigSettingBox serviceID={serviceID} />;
    else if (dialogType === 'method')
      return <MethodSettingBox serviceID={serviceID} />;
    else if (dialogType === 'conversionTable')
      return <ConversionTableSettingBox serviceID={serviceID} />;
  }, [dialogType]);

  return (
    <Dialog
      open={isCalculationSettingDialogOpen}
      onClose={closeCalculationSettingDialog}
      fullWidth
      maxWidth={'lg'}
    >
      <DialogContent>{renderContent()}</DialogContent>
    </Dialog>
  );
};
