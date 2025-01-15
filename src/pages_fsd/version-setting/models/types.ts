export type Server = 'realDb' | 'testDb' | 'devDb';
export type ServerName = '테스트' | '리얼' | '개발';

export type VersionServer = {
  value: Omit<Server, 'devDb'>;
  label: Omit<ServerName, '개발'>;
};

export type CurTBLVersion = {
  ServiceID: string;
  TableName: string;
  Version: number;
};

export type CurTBLVersionList = {
  server: Server;
  curTBLVersion: CurTBLVersion[];
};
