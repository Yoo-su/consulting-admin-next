import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { useSharedStore } from '@/shared/models';

import { VERSION_SERVER } from '../constants';
import { VersionServer } from '../models';

export const useVersionSetting = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  const { currentUniv, currentService } = useSharedStore(
    useShallow((state) => ({
      currentService: state.currentService,
      currentUniv: state.currentUniv,
    }))
  );

  const univName = currentUniv?.univName ?? '';
  const serviceID = currentService?.serviceID ?? '';

  const [serverType, setServerType] = useState<VersionServer>(
    VERSION_SERVER[0]
  );

  return {
    downmd,
    univName,
    serviceID,
    serverType,
    setServerType,
  };
};
