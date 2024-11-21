export type CalcMethod = {
  ServiceID: number;
  CalcMethodID: number;
  CalcMethodType: string;
  Description: string;
  ConfigJSON: {
    steps: Step[];
  };
};

export type Step = {
  method: string;
  description: string;
  source: SourceOrTarget;
  target: SourceOrTarget;
};

export type SourceOrTarget = {
  type: string;
  field: string;
  conversionType?: string;
};
