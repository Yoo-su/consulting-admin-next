export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
  },
  dashboard: {
    overview: '/dashboard/overview',
    serviceSetting: '/dashboard/service-setting',
    consultingFilesSetting: '/dashboard/consulting-files-setting',
    excelUpload: '/dashboard/excel-upload',
    mojipSetting: '/dashboard/mojip-setting',
    chartSetting: '/dashboard/chart-setting',
    scheduleSetting: '/dashboard/schedule-setting',
    flutterUserSettigs: '/dashboard/flutter-setting',
    consultingStatistic: '/dashboard/consulting-statistic',
    excelLibrary: '/dashboard/excel-library',
    accountSetting: '/dashboard/account-setting',
    appDeploy: '/dashboard/app-deploy',
    appVersionHistory: '/dashboard/app-version-history',
    dataDeploy: '/dashboard/data-deploy',
    etcFiles: '/dashboard/etc-files',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
