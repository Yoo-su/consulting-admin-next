export type FlutterSetting = {
  [key: string]: any;
};

export type FlutterRowInfo = {
  Category: string;
  RowIdx?: number;
  Title: string;
  Type: string;
  Description: string;
  IsRequired: boolean;
  ParentIdx: null | number;
  DefaultValue: string;
};
