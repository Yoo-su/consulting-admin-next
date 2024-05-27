export const apiUrls = {
  user: {
    signin: '/auth/login',
    profile: '/auth/profile',
  },
  dashboard: {
    consultingAppState: '/dashboard/consultingapp-state',
    foundationLibrary: '/file/foundation-library',
    foundationLibraryFileOnly: '/file/foundation-library-file-only',
    deployApp: '/deploy/deploy-app',
    deployTestData: '/foundation/sync-from-test',
    getAppVersionHistory: '/deploy/version-update-history',
    getConsultingFileList: 'reflibrary/',
    downloadConsultingFile: 'reflibrary/download/',
    uploadConsultingFile: 'reflibrary/upload',
    updateConsultingRefTitle: 'reflibrary/update-reftitle',
    updateConsultingRefNo: 'reflibrary/update-refno',
    deleteConsultingFile: 'reflibrary',
  },
  admin: {
    getUnivList: '/admin/univlist',
    getServiceList: '/admin/service',
  },
};
