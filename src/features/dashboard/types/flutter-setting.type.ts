export type FlutterSetting = FlutterCategory & {
  children?: FlutterRowInfo[];
};

export type FlutterCategory = {
  CategoryIdx: number;
  Category: string;
  Description: string;
};
export type FlutterRowInfo = {
  Category: string;
  RowIdx: number;
  Title: string;
  KoreanTitle: string;
  Type: string;
  Description: string;
  IsRequired: boolean;
  ParentIdx: null | number;
  DefaultValue: string;
  children: FlutterRowInfo[];
  level: number;
  transferDefaultValue: any;
  RowValue?: string;
};
