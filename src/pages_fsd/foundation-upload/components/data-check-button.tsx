import CheckIcon from '@mui/icons-material/Check';
import { Button, Typography } from '@mui/material';
import { memo, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { useSharedStore } from '@/shared/models';

import { JsonExcel, useFoundationStore, useOptionStore, useUiStore } from '../models';
import { checkExcelData, convertExcelToJson } from '../services';

export const DataCheckButton = memo(() => {
  const { currentService, currentUniv } = useSharedStore(
    useShallow((state) => ({
      currentService: state.currentService,
      currentUniv: state.currentUniv,
    }))
  );
  const file = useFoundationStore((state) => state.file);
  const isFileOnly = useOptionStore((state) => state.isFileOnly);
  const { isDataChecked, setAlertOption, setIsDataChecked } = useUiStore(
    useShallow((state) => ({
      isDataChecked: state.isDataChecked,
      setAlertOption: state.setAlertOption,
      setIsDataChecked: state.setIsDataChecked,
    }))
  );

  /**
   * 엑셀 read 비동기화
   * @param excel
   */
  const readExcelFile = async (excel: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        try {
          const buffer = e.target?.result;
          const jsonExcel: JsonExcel = convertExcelToJson(buffer);
          checkExcelData(jsonExcel.data, currentService?.serviceID ?? '', currentUniv?.univID ?? '');
          setAlertOption({
            message: '데이터 검증이 완료되었습니다. 업로드를 진행해주세요',
            color: 'info',
          });
          setIsDataChecked(true);
          resolve(true);
        } catch (error) {
          if (error instanceof Error) {
            if (isFileOnly) {
              setAlertOption({
                message: error.message + '단, 파일만 업로드는 가능합니다.',
                color: 'warning',
              });
              setIsDataChecked(true);
              resolve(true);
            } else {
              setAlertOption({ message: error.message, color: 'error' });
            }
          }
          if (!isFileOnly) {
            setIsDataChecked(false);
            resolve(false);
          }
        }
      };
      fileReader.readAsArrayBuffer(excel);
    });
  };

  useEffect(() => {
    setIsDataChecked(false);
  }, [currentService, file, isFileOnly]);

  if (!file || isDataChecked) return null;
  return (
    <Button
      variant="contained"
      onClick={async () => {
        await readExcelFile(file!);
      }}
    >
      <CheckIcon />
      <Typography variant="body1">데이터 검증하기</Typography>
    </Button>
  );
});
DataCheckButton.displayName = 'DataCheckButton';
