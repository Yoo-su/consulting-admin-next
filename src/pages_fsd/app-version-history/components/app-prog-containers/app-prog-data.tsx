'use client';

import { useState } from 'react';

import { AppHistory } from '../../models';
import { getAppDownloadUrl } from '../../services';
import { QrModal } from '../qr-modal';
import { AppProgFileItems } from './app-prog-file-items';

type AppProgDataProps = {
  history: AppHistory;
};

export const AppProgData = ({ history }: AppProgDataProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppProgFileItems history={history} setOpen={setOpen} />
      <QrModal
        open={open}
        handleClose={handleClose}
        fileName={history.packageFileName}
        url={getAppDownloadUrl(history)}
      />
    </>
  );
};
