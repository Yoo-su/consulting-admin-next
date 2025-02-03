import { EXCEL_LAYOUT } from '../constants';
import { convertSheetName } from './convert-sheet-name';

type ExcelData = {
  [key: string]: { [key: string]: { [key: string]: string } };
};
export const checkExcelData = (data: ExcelData, serviceID: string, univID: string) => {
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
          `엑셀 레이아웃이 맞지 않습니다. [${convertSheetName(
            key,
            'eng'
          )}] 시트의 "${layoutColumns[index]}" 컬럼쪽을 확인해주세요.`
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
  if (Number(excelServiceID) !== Number(serviceID)) {
    throw new Error('입력한 서비스 아이디와 엑셀 파일의 서비스 아이디가 다릅니다.');
  }

  if (Number(excelUnivID) !== Number(univID)) {
    throw new Error('[서비스정보] 시트의 UnivID와 ServiceID가 다릅니다.');
  }
};
