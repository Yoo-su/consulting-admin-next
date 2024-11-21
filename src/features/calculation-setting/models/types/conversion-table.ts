export type ComparisonMethod = 'EX' | 'GTE' | 'GT' | 'LTE' | 'LT';

export type ConversionTable = {
  ServiceID: string;
  ConversionTableID: string;
  ScoreConversionType: string;
  Description: string;
  ScoreConversionJSON: {
    conversionRules: {
      conditions: any[];
      conversions: {
        [key: string]: string;
      };
    }[];
  };
  ComparisonMethod: ComparisonMethod;
};
