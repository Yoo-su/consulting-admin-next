'use client';

import ContentWrapper from '@/shared/components/ui/content-wrapper';
import {
  FormControl,
  Stack,
  Typography,
  InputLabel,
  Input,
  InputAdornment,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { useUnivService } from '@/shared/hooks/context';
import { useHandleMajorFile, useUploadMajorFileMutation } from '../hooks';
import FileItemCard, { FileType } from '@/shared/components/ui/file-item-card';
import { useUser } from '@/shared/hooks/context';
import EmptyBox from '@/shared/components/ui/empty-box';

const MajorFileUploadContainer = () => {
  const { user } = useUser();
  const { currentUniv, currentService } = useUnivService();
  const {
    majorFiles,
    isDragging,
    inputRef,
    uploadDirectory,
    isUploadSuccess,
    isUploadLoading,
    resetState,
    handleClickInputBox,
    handleClickUploadBtn,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleRemoveMajorFile,
    handleFileChange,
  } = useHandleMajorFile();

  return (
    <ContentWrapper>
      <ContentWrapper.Header
        bottomDivider
        sxProps={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography
          variant="h6"
          textAlign={'left'}
        >{`${currentUniv?.univName}(${currentService?.serviceID}) 학과 자료 업로드`}</Typography>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">업로드 경로</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <FolderOpenIcon />
              </InputAdornment>
            }
            placeholder={uploadDirectory}
          />
        </FormControl>
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
          {majorFiles.length ? (
            <Stack direction={'column'} alignItems={'flex-start'} width={'100%'} flexWrap={'wrap'}>
              <Typography variant="h6">
                {isUploadSuccess
                  ? `${majorFiles.length}개의 자료가 업로드되었습니다`
                  : `${majorFiles.length}개의 자료가 대기중입니다..`}
              </Typography>
              <Grid
                container
                direction={'row'}
                alignItems={'flex-start'}
                sx={{
                  mt: 3,
                  borderRadius: '0.8rem',
                  p: 1,
                  minHeight: '200px',
                  maxHeight: '450px',
                  overflowY: 'scroll',
                  bgcolor: 'rgba(0,0,0,0.015)',
                  ...(isDragging && {
                    bgcolor: 'rgba(0,0,0,0.04)',
                  }),
                }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {majorFiles.map((fileItem) => {
                  const fileType = fileItem.name.split('.')[1] ?? 'none';
                  return (
                    <Grid
                      key={fileItem.name}
                      component={'div'}
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={3}
                      onDragOver={handleDragOver}
                    >
                      <FileItemCard
                        sxProps={{
                          bgcolor: '#fff',
                          ...(!isUploadSuccess && {
                            animation: 'wiggle 2s infinite',
                          }),
                          ':hover': {
                            border: '1px solid #BC5448',
                          },
                          m: 1,
                        }}
                        tooltipMsg={'클릭 시 목록에서 제거됩니다.'}
                        handleClick={() => {
                          handleRemoveMajorFile(fileItem.name);
                        }}
                      >
                        <FileItemCard.IconBox file={fileType as FileType} />
                        <FileItemCard.ContentBox>
                          <FileItemCard.TitleBox title={fileItem.name} />

                          <FileItemCard.AdditionalInfo sxProps={{ justifyContent: 'flex-end' }}>
                            <Typography variant="caption" color={'rgba(0,0,0,0.7)'}>
                              {fileItem.size} bytes
                            </Typography>
                          </FileItemCard.AdditionalInfo>
                        </FileItemCard.ContentBox>
                      </FileItemCard>
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
          ) : (
            <EmptyBox
              text={'업로드할 자료를 드래그하세요'}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          )}
          <Divider sx={{ width: '100%', my: 2, borderColor: 'rgba(0,0,0,0.08)' }} />
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
            {isUploadSuccess ? (
              <Button variant="contained" color="inherit" startIcon={<RestartAltIcon />} onClick={resetState}>
                <Typography variant="body2">초기화</Typography>
              </Button>
            ) : (
              <Button variant="contained" color="info" startIcon={<AddCircleIcon />} onClick={handleClickInputBox}>
                <Typography variant="body2">업로드할 자료 추가</Typography>
              </Button>
            )}
            {!!majorFiles.length && (
              <LoadingButton
                loading={isUploadLoading}
                variant={'contained'}
                color="success"
                startIcon={<CloudUploadIcon />}
                onClick={() => {
                  handleClickUploadBtn(user!, currentUniv!);
                }}
                disabled={isUploadSuccess}
              >
                <Typography variant="body2">{isUploadSuccess ? '업로드 완료' : '자료 업로드'}</Typography>
              </LoadingButton>
            )}
          </Stack>
          <input type="file" ref={inputRef} multiple style={{ display: 'none' }} onChange={handleFileChange} />
        </Stack>
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default MajorFileUploadContainer;
