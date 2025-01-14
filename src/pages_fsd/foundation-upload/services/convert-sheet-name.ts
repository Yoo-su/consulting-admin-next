import { SHEET_NAME_MAP } from '../constants';

/**
 * 시트명 한-영 전환 메서드
 * @param str 변환을 원하는 문자열
 * @param lang 파라미터로 전달될 문자열의 한글/영문 여부
 * @returns
 */
export const convertSheetName = (str: string, lang: 'eng' | 'kor') => {
  if (lang === 'eng') {
    return SHEET_NAME_MAP[str] || str;
  } else if (lang === 'kor') {
    const korName = Object.keys(SHEET_NAME_MAP).find(
      (key) => SHEET_NAME_MAP[key] === str
    );
    return korName || str;
  }
  return str;
};
