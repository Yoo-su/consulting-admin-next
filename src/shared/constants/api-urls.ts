export const API_URLS = {
  user: {
    signin: '/auth/login',
    profile: '/auth/profile',
    updateProfileImage: '/user/profile/upload',
  },
  dashboard: {
    getConsultingAppState: '/admin/service-detail',
    getConsultingAppStateAll: '/admin/service-details',
    updateConsultingAppState: '/admin/service-detail/state',
    syncMoaNesinService: '/admin/service-detail/sync/moa',
    createService: '/foundation/service',
    updateIsNew: '/foundation/service/update-is-new',
    versionList: '/foundation/table-version',
    foundationLibrary: '/file/foundation-library',
    foundationLibraryFileOnly: '/file/foundation-library-file-only',
    etcLibrary: '/file/etc-library',
    deployApp: '/deploy/deploy-app',
    deployTestData: '/foundation/sync/from-test',
    syncFromTestToDev: '/foundation/sync/from-test-to-dev',
    getAppVersionHistory: '/deploy/version-update-history',
    getAppDownloadUrl: '/deploy/download',
    getConsultingFileList: 'reflibrary/',
    downloadConsultingFile: 'reflibrary/download',
    uploadConsultingFile: 'reflibrary/upload',
    updateConsultingRefTitle: 'reflibrary/update-reftitle',
    updateConsultingRefNo: 'reflibrary/update-refno',
    chartData: '/app-setup/chartdata',
    deleteConsultingFile: 'reflibrary/delete',
    detailpage: '/app-setup/detailpage',
    updateDetailpageData: '/app-setup/detailpage/bulk',
    duplicateDetailpage: '/app-setup/detailpage/duplicate',
    syncDetailpage: '/app-setup/sync/detailpage',
    getFlutterCategory: '/custom-config/category',
    getFlutterRowInfo: '/custom-config/rows-info-hierarchy',
    flutterCustomConfig: '/custom-config',
    setDuplicateSetting: '/custom-config/duplicate',
    uploadMajorFile: '/subject/upload',
    getbrowserFile: '/file/browse',
    downloadBrowserFile: '/file/download',
    deleteBrowserFile: '/file/delete',
    renameBrowserFile: '/file/rename',
    getConversionTable: (serviceID: string) =>
      `/scoring/conversion/${serviceID}`,
    createConversionTable: (serviceID: string) =>
      `/scoring/conversion/${serviceID}`,
    updateConversionTable: (serviceID: string, tableID: string) =>
      `/scoring/conversion/${serviceID}/${tableID}`,
    deleeteConversionTable: '/scoring/conversion',
    getCalcConfig: (serviceID: string) => `/scoring/calc-config/${serviceID}`,
    createCalcConfig: (serviceID: string) =>
      `/scoring/calc-config/${serviceID}`,
    updateCalcConfig: (serviceID: string, configID: string) =>
      `/scoring/calc-config/${serviceID}/${configID}`,
    deleteCalcConfig: (serviceID: string, configID: string) =>
      `/scoring/calc-config/${serviceID}/${configID}`,
    getCalcMethod: (serviceID: string) => `/scoring/calc-method/${serviceID}`,
    createCalcMethod: (serviceID: string) =>
      `/scoring/calc-method/${serviceID}`,
    updateCalcMethod: (serviceID: string, methodID: string) =>
      `/scoring/calc-method/${serviceID}/${methodID}`,
    deleteCalcMethod: (serviceID: string, methodID: string) =>
      `/scoring/calc-method/${serviceID}/${methodID}`,
  },
  admin: {
    getUnivList: '/admin/university/list',
    getServiceList: '/admin/service',
  },
};
