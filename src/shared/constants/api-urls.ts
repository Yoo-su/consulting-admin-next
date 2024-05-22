export const apiUrls = {
  user: {
    signin: '/auth/login',
  },
  dashboard: {
    consultingAppState: '/dashboard/consultingapp-state',
    foundationLibrary: '/file/foundation-library',
    deployApp: '/deploy/deploy-app',
    getAppVersionHistory: '/deploy/version-update-history',
    getConsultingFileList: 'reflibrary/',
    downloadConsultingFile: 'reflibrary/download/',
    uploadConsultingFile: 'reflibrary/upload',
    updateConsultingFile: 'reflibrary/mojip-status',
    updateConsultingRefNo: 'reflibrary/update-refno',
    deleteConsultingFile: 'reflibrary',
  },
  admin: {
    getUnivList: '/admin/univlist',
    getServiceList: '/admin/service',
  },
};
