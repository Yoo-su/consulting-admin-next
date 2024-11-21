import { CloseOutlined } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useCallback } from 'react';

import ButtonIcon from '@/shared/components/ui/button-icon';

import { useCalculationSettingStore } from '../../models';
import ConfigSettingBox from '../config-setting-box';
import ConversionTableSettingBox from '../conversion-table-setting-box';
import MethodSettingBox from '../method-setting-box';

const CalculationSettingDialog = () => {
  const {
    dialogType,
    isCalculationSettingDialogOpen,
    closeCalculationSettingDialog,
  } = useCalculationSettingStore();

  const renderContent = useCallback(() => {
    if (dialogType === 'config') return <ConfigSettingBox />;
    else if (dialogType === 'method') return <MethodSettingBox />;
    else if (dialogType === 'conversion-table')
      return <ConversionTableSettingBox />;
    else return <></>;
  }, [dialogType]);

  return (
    <Dialog
      open={isCalculationSettingDialogOpen}
      onClose={closeCalculationSettingDialog}
      fullWidth
      maxWidth={'lg'}
    >
      <DialogTitle>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <ButtonIcon
            Icon={CloseOutlined}
            onClick={closeCalculationSettingDialog}
          />
        </Stack>
      </DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
    </Dialog>
  );
};

export default CalculationSettingDialog;
