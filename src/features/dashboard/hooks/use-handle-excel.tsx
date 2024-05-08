import { useState, useCallback } from 'react';
import { read, utils } from 'xlsx';
import { EXCEL_LAYOUT } from '../constants/excel/excel-layout';

export const useHandleExcel = () => {
  const [excel, setExcel] = useState<File | null>(null);
  const [data, setData] = useState(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const readExcel = () => {
    setIsVerifying(true);
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const buffer = e.target?.result;
      const workbook = read(buffer, { type: 'buffer' });
      checkSheetNames(workbook.SheetNames);
      const sheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[sheetName];
      const data = utils.sheet_to_json(workSheet);
    };
    excel && fileReader.readAsArrayBuffer(excel);
  };

  /**
   * 엑셀 시트명 목록 검증 메소드
   * 시트명 목록 검증의 순서는 다음과 같다
   *
   * @param sheetNames 엑셀 시트명 목록
   */
  const checkSheetNames = (sheetNames: string[]) => {
    const layoutSheetNames = Object.keys(EXCEL_LAYOUT);
  };

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

  return { excel, setExcel, isVerifying, readExcel };
};
