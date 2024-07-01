export type CurTBLVersion = {
  ServiceID: string;
  TableName: string;
  Version: number;
};

export type CurTBLVersionList = {
  server: 'realDb' | 'testDb' | 'devDb';
  curTBLVersion: CurTBLVersion[];
};
