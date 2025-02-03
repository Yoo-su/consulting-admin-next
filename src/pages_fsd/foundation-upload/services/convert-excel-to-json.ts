import { read, utils } from 'xlsx';

import { SHEET_FLAG } from '../constants';
import { convertSheetName } from './convert-sheet-name';

/**
 * Json 형태로 정리된 excel 내용 반환 메서드
 * @param buffer
 * @returns
 */
export const convertExcelToJson = (buffer: string | ArrayBuffer | null | undefined) => {
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
