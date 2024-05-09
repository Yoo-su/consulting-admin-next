import { useState, useCallback } from 'react';
import { read, utils } from 'xlsx';
import { AlertColor } from '@mui/material';

import { useUnivService } from '@/shared/hooks/use-univ-service';
import { useUploadExcelMutation } from './tanstack/use-upload-excel-mutation';
import { EXCEL_LAYOUT, SHEET_FLAG } from '../constants/excel';

type JsonExcel = {
  data: any;
  sheetCheck: any;
};
export const useHandleExcel = () => {
  const { currentService } = useUnivService();
  const { mutateAsync } = useUploadExcelMutation();
  const [excel, setExcel] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | undefined>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<{ text: string | null; color: AlertColor }>({
    text: null,
    color: 'info',
  });

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
          setHelperText({ text: '데이터 검증이 완료되었습니다. 업로드를 진행해주세요', color: 'info' });
          setIsVerified(true);
          resolve(true);
        } catch (error) {
          if (error instanceof Error) {
            setHelperText({ text: error.message, color: 'error' });
          }
          setIsVerified(false);
          resolve(false);
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
      setHelperText({ text: '엑셀 파일이 등록되지 않았습니다', color: 'error' });
      return;
    }
    return await readExcelFile(excel);
  };

  /**
   * 시트명 한-영 전환 메서드
   * @param str 변환을 원하는 문자열
   * @param lang 파라미터로 전달될 문자열의 한글/영문 여부
   * @returns
   */
  const convertSheetName = (str: string, lang: 'eng' | 'kor') => {
    let returnStr = '';
    if (lang == 'eng') {
      if (str == 'Service') returnStr = '서비스정보';
      else if (str == 'Code') returnStr = '코드표';
      else if (str == 'Seltype') returnStr = '전형상담타입';
      else if (str == 'College') returnStr = '단과대학';
      else if (str == 'Order') returnStr = '계열';
      else if (str == 'Major') returnStr = '학과설명';
      else if (str == 'ConstraintCase') returnStr = '수능제약케이스';
      else if (str == 'SATCase') returnStr = '수능점수케이스';
      else if (str == 'SATSelect') returnStr = '수능선택과목';
      else if (str == 'HSBCase') returnStr = '학생부점수케이스';
      else if (str == 'HSBInput') returnStr = '학생부점수케이스입력';
      else if (str == 'Schedule') returnStr = '입시일정';
      else returnStr = str;
      return returnStr;
    } else if (lang == 'kor') {
      if (str == '서비스정보') returnStr = 'Service';
      else if (str == '코드표') returnStr = 'Code';
      else if (str == '전형상담타입') returnStr = 'Seltype';
      else if (str == '단과대학') returnStr = 'College';
      else if (str == '계열') returnStr = 'Order';
      else if (str == '학과설명') returnStr = 'Major';
      else if (str == '수능제약케이스') returnStr = 'ConstraintCase';
      else if (str == '수능점수케이스') returnStr = 'SATCase';
      else if (str == '수능선택과목') returnStr = 'SATSelect';
      else if (str == '학생부점수케이스') returnStr = 'HSBCase';
      else if (str == '학생부점수케이스입력') returnStr = 'HSBInput';
      else if (str == '입시일정') returnStr = 'Schedule';
      else returnStr = str;
    }
    return returnStr;
  };

  /**
   * Json 형태로 정리된 excel 내용 반환 메서드
   * @param buffer
   * @returns
   */
  const excelToJson = (buffer: string | ArrayBuffer | null | undefined) => {
    let sheetCheck: typeof SHEET_FLAG = SHEET_FLAG;
    let tmpResult: any = {};
    let returnVal: any = {};

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
  const validation = (data: any) => {
    // Layout 맞춤
    for (let key in data) {
      let sheet = data[key][0];
      let i = 0;
      for (let col in sheet) {
        // 레이아웃에 없는 시트/컬럼이 엑셀에 존재
        if (Object.keys(EXCEL_LAYOUT).findIndex((layoutKey) => layoutKey === key) === -1) {
          throw new Error(
            '정해진 레이아웃이 아닌 시트/컬럼이 있습니다. [' + key + '] 시트 ' + sheet[col] + '를 확인해주세요'
          );
        }
        if (sheet[col] !== EXCEL_LAYOUT[key][i]) {
          throw new Error(
            '엑셀 레이아웃이 맞지 않습니다. [' +
              convertSheetName(key, 'eng') +
              '] 시트의 "' +
              EXCEL_LAYOUT[key][i] +
              '" 컬럼쪽을 확인해주세요.'
          );
        }
        i++;
      }

      // primary key 체크
      for (let primaryKey in data[key]) {
        if (!data[key][primaryKey].A) {
          throw new Error(
            '[' + convertSheetName(key, 'eng') + ']시트의 ' + primaryKey + '번째 행의 PK 조건이 안 맞습니다.'
          );
        }
      }

      const excelServiceID = data.Service[1].B;
      const excelUnivID = data.Service[1].A;
      if (excelServiceID !== currentService?.serviceID) {
        throw new Error('입력한 서비스 아이디와 엑셀 파일의 서비스 아이디가 다릅니다.');
      }

      if (excelUnivID !== currentService?.univID) {
        throw new Error('[서비스정보] 시트의 UnivID와 ServiceID가 다릅니다.');
      }
    }
  };

  const upload = () => {
    if (!excel) return;

    const formData = new FormData();
    formData.append('file', excel);
    mutateAsync(formData).then((res) => {
      if (res.data.success) {
        setHelperText({ text: res.data.message ?? '엑셀이 성공적으로 업로드되었습니다', color: 'success' });
        setIsUploaded(true);
      } else {
        setHelperText({ text: res.data.message ?? '엑셀 업로드 중 문제가 발생했습니다', color: 'error' });
      }
    });
  };

  /**
   * 데이터 검증 전 단계로 리셋 메서드
   */
  const clearVerifiedState = useCallback(() => {
    setHelperText({ text: null, color: 'info' });
    setIsVerified(false);
    setIsUploaded(false);
  }, []);

  return {
    excel,
    setExcel,
    startVerify,
    helperText,
    isVerified,
    upload,
    isUploaded,
    setIsVerified,
    setHelperText,
    clearVerifiedState,
  };
};
