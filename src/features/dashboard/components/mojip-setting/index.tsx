'use client';

import { useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ContentWrapper from '@/shared/components/content-wrapper';
import Tiptap from '@/shared/components/tiptap-editor';
import { useUnivService } from '../../hooks/context/use-univ-service';

const MojipSettingBox = () => {
  const { currentService, currentUniv } = useUnivService();

  return (
    <ContentWrapper>
      <Typography
        variant="h6"
        textAlign={'left'}
        width={'100%'}
      >{`${currentUniv?.univName}(${currentService?.serviceID}) 모집요강 설정`}</Typography>
    </ContentWrapper>
  );
};

export default MojipSettingBox;
