'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { read, utils } from 'xlsx';

import { useUnivService } from '@/shared/hooks/context';
import { useUploadFoundationLibraryMutation } from './use-upload-foundation-library-mutation';
import { useUploadFoundationLibraryFileOnlyMutation } from './use-upload-foundation-library-fileonly-mutation';
import { EXCEL_LAYOUT, SHEET_FLAG } from '../constants';
import { useUser } from '@/shared/hooks/context';
import { useMuiAlert } from '@/shared/hooks/use-mui-alert';
import { useStepper } from '@/shared/hooks/use-stepper';

type JsonExcel = {
  data: any;
  sheetCheck: any;
};
export const useHandleExcel = () => {
  const { user } = useUser();
  const { currentService } = useUnivService();
  const [excel, setExcel] = useState<File | null>(null);
  const [fileOnly, setFileOnly] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [isVerified, setIsVerified] = useState<boolean | undefined>(false);
  const { alertData, setAlertData } = useMuiAlert();
  const { activeStep, handleNext, handleReset: resetStep, goToStep } = useStepper();

  const {
    mutateAsync: basicUpload,
    isPending: isUploadingBasic,
    isSuccess: uploadBasicSuccess,
    reset,
  } = useUploadFoundationLibraryMutation();
  const {
    mutateAsync: fileOnlyUpload,
    isPending: isUploadingFileOnly,
    isSuccess: uploadFileOnlySuccess,
    reset: resetFileOnly,
  } = useUploadFoundationLibraryFileOnlyMutation();

  const uploading = useMemo(() => {
    return isUploadingBasic || isUploadingFileOnly;
  }, [isUploadingBasic, isUploadingFileOnly]);

  const success = useMemo(() => {
    return uploadBasicSuccess || uploadFileOnlySuccess;
  }, [uploadBasicSuccess, uploadFileOnlySuccess]);

  // 선택된 서비스ID 변경 시 처리
  useEffect(() => {
    if (currentService) formData.set('serviceID', currentService?.serviceID);
    setExcel(null);
    resetStep();
  }, [currentService]);

  // input excel이 변경될 때 처리
  useEffect(() => {
    clearVerifiedState();
    if (excel) {
      formData.set('file', excel);
      goToStep(1);
    } else {
      formData.delete('file');
      resetStep();
    }
  }, [excel]);

  // 업로드 유저 등록
  useEffect(() => {
    if (user) formData.set('userID', user?.sub);
  }, [user]);

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
          const jsonExcel: JsonExcel = excelToJson(buffer);
          validation(jsonExcel.data);
          setAlertData({ message: '데이터 검증이 완료되었습니다. 업로드를 진행해주세요', color: 'info' });
          setIsVerified(true);
          handleNext();
          resolve(true);
        } catch (error) {
          if (error instanceof Error) {
            if (fileOnly) {
              setAlertData({ message: error.message + '단, 파일만 업로드는 가능합니다.', color: 'warning' });
              setIsVerified(true);
              handleNext();
              resolve(true);
            } else {
              setAlertData({ message: error.message, color: 'error' });
            }
          }
          if (!fileOnly) {
            setIsVerified(false);
            resolve(false);
          }
        }
      };
      fileReader.readAsArrayBuffer(excel);
    });
  };

  /**
   * 엑셀 검증 후 결과 반환 메서드
   */
  const startVerify = async () => {
    if (!excel) {
      setAlertData({ message: '엑셀 파일이 등록되지 않았습니다', color: 'error' });
      return;
    }
    return await readExcelFile(excel);
  };

  const sheetNameMap: Record<string, string> = {
    Service: '서비스정보',
    Code: '코드표',
    Seltype: '전형상담타입',
    College: '단과대학',
    Order: '계열',
    Major: '학과설명',
    ConstraintCase: '수능제약케이스',
    SATCase: '수능점수케이스',
    SATSelect: '수능선택과목',
    HSBCase: '학생부점수케이스',
    HSBInput: '학생부점수케이스입력',
    Schedule: '입시일정',
  };

  /**
   * 시트명 한-영 전환 메서드
   * @param str 변환을 원하는 문자열
   * @param lang 파라미터로 전달될 문자열의 한글/영문 여부
   * @returns
   */
  const convertSheetName = (str: string, lang: 'eng' | 'kor') => {
    if (lang === 'eng') {
      return sheetNameMap[str] || str;
    } else if (lang === 'kor') {
      const korName = Object.keys(sheetNameMap).find((key) => sheetNameMap[key] === str);
      return korName || str;
    }
    return str;
  };

  /**
   * Json 형태로 정리된 excel 내용 반환 메서드
   * @param buffer
   * @returns
   */
  const excelToJson = (buffer: string | ArrayBuffer | null | undefined) => {
    let sheetCheck: typeof SHEET_FLAG = SHEET_FLAG;
    let tmpResult: any = {};
    const returnVal: any = {};

    const data = read(buffer, { type: 'buffer' });
    data.SheetNames.forEach((sheetName) => {
      const roa = utils.sheet_to_json(data.Sheets[sheetName], {
        header: 'A',
      });

      sheetCheck = SHEET_FLAG.filter((element) => element !== sheetName);
      const thisSheet = convertSheetName(sheetName, 'kor');
      if (roa.length) tmpResult[thisSheet] = roa;
      else tmpResult = '';
    });

    returnVal.data = tmpResult;
    returnVal.sheetCheck = sheetCheck;
    return returnVal;
  };

  /**
   * 엑셀 검증 메서드
   * @param data json 엑셀
   */
  interface ExcelData {
    [key: string]: { [key: string]: { [key: string]: string } };
  }

  const validation = (data: ExcelData) => {
    Object.entries(data).forEach(([key, sheet]) => {
      if (key.match(/^(레이아웃|기본자료)$/)) return;
      const layoutKeys = Object.keys(EXCEL_LAYOUT);
      if (!layoutKeys.includes(key)) {
        throw new Error(
          `정해진 레이아웃이 아닌 시트/컬럼이 있습니다. [${key}] 시트 ${Object.values(sheet[0])[0]}를 확인해주세요`
        );
      }

      const layoutColumns = EXCEL_LAYOUT[key];
      const sheetColumns = Object.values(sheet[0]);

      sheetColumns.forEach((column, index) => {
        if (column !== layoutColumns[index]) {
          throw new Error(
            `엑셀 레이아웃이 맞지 않습니다. [${convertSheetName(key, 'eng')}] 시트의 "${
              layoutColumns[index]
            }" 컬럼쪽을 확인해주세요.`
          );
        }
      });

      Object.entries(data[key])
        .slice(1)
        .forEach(([primaryKey, row]) => {
          if (!row.A) {
            throw new Error(`[${convertSheetName(key, 'eng')}]시트의 ${primaryKey}번째 행의 PK 조건이 안 맞습니다.`);
          }
        });
    });

    const excelUnivID = data.Service[1].A;
    const excelServiceID = data.Service[1].B;
    if (Number(excelServiceID) !== Number(currentService?.serviceID)) {
      throw new Error('입력한 서비스 아이디와 엑셀 파일의 서비스 아이디가 다릅니다.');
    }

    if (Number(excelUnivID) !== Number(currentService?.univID)) {
      throw new Error('[서비스정보] 시트의 UnivID와 ServiceID가 다릅니다.');
    }
  };

  /**
   *  엑셀 업로드
   */
  const upload = () => {
    if (!excel) return;
    const mutationFunc = fileOnly ? fileOnlyUpload : basicUpload;

    mutationFunc(formData).then((res) => {
      if (res.data.statusCode === 201) {
        setAlertData({ message: res.data.message ?? '파일 업로드를 성공적으로 마쳤습니다', color: 'success' });
        handleNext();
      } else {
        setAlertData({ message: res.data.message ?? '엑셀 업로드 중 문제가 발생했습니다', color: 'error' });
      }
    });
  };

  /**
   * 데이터 검증 전 단계로 리셋 메서드
   */
  const clearVerifiedState = useCallback(() => {
    reset();
    resetFileOnly();
    setAlertData(null);
    setIsVerified(false);
  }, []);

  return {
    excel,
    setExcel,
    startVerify,
    alertData,
    activeStep,
    isVerified,
    upload,
    success,
    uploading,
    fileOnly,
    setFileOnly,
    setIsVerified,
    setAlertData,
    clearVerifiedState,
  };
};
