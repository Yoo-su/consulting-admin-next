import { createQueryKeys } from '@lukemorales/query-key-factory';

export const flutterSettingKeys = createQueryKeys('flutter-setting', {
  'basic-list': [undefined],
  'custom-config': (serviceID: string) => [{ serviceID: serviceID }],
});
