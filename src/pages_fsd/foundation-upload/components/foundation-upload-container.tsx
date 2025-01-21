'use client';

import {
  Stack,
  styled,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';

import excelIcon from '@/shared/assets/svgs/excel.svg';
import starIcon from '@/shared/assets/svgs/star.svg';
import { ContentWrapper, DropZoneContainer } from '@/shared/components';

import { useHandleFoundationData } from '../hooks';
import { DataCheckButton } from './data-check-button';
import { FileInput } from './file-input';
import { Header } from './header';
import { LoadingCover } from './loading-cover';
import { UploadButton } from './upload-button';
import { UploadStateAlert } from './upload-state-alert';
import { UploadStateStepper } from './upload-state-stepper';

export const FoundationUploadContainer = () => {
  const {
    inputRef,
    inputElKey,
    containerTitle,
    uploadInputTitle,
    handleClickInput,
    handleDropExcel,
    handleInputChange,
  } = useHandleFoundationData();
  const theme = useTheme();
  const downsm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Header />
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        <Stack direction={'row'} alignItems={'center'} gap={0.5}>
          <Image src={starIcon} width={'32'} height={'32'} alt="star" />
          <Typography variant={downsm ? 'body1' : 'h4'}>
            {containerTitle}
          </Typography>
        </Stack>

        <UploadStateStepper />

        <UploadStateAlert />

        <FileControllerBox spacing={2}>
          <DropZoneContainer
            onClick={handleClickInput}
            onDrop={handleDropExcel}
            sx={dropzoneStyle}
          >
            <Image
              src={excelIcon}
              width={'48'}
              height={'48'}
              alt="excel-image"
            />
            <UploadInputTitle variant="body2" color="grey.700">
              {uploadInputTitle}
            </UploadInputTitle>

            <LoadingCover />
          </DropZoneContainer>

          <DataCheckButton />

          <UploadButton />
        </FileControllerBox>

        <FileInput
          inputKey={inputElKey}
          inputRef={inputRef}
          handleChange={handleInputChange}
        />
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

const UploadInputTitle = styled(Typography)({
  textAlign: 'center',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const FileControllerBox = styled(Stack)({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  margin: '1rem 0',
});

const dropzoneStyle: SxProps = {
  display: 'flex',
  cursor: 'pointer',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '1rem',
  position: 'relative',
  height: '280px',
  padding: '0 0.5rem',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  gap: 3,
  minWidth: {
    xs: '90%',
    sm: '70%',
    md: '70%',
    lg: '70%',
    xl: '70%',
  },
};
