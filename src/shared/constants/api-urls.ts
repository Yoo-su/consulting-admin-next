import { getFlutterRowInfo } from '@/features/dashboard/apis/get-flutter-row-info';

export const apiUrls = {
  user: {
    signin: '/auth/login',
    profile: '/auth/profile',
    updateProfileImage: '/user/profile/upload',
  },
  dashboard: {
    getConsultingAppState: '/admin/service-detail',
    getConsultingAppStateAll: '/admin/service-detail-all',
    updateConsultingAppState: '/admin/service-detail/current-state',
    syncMoaNesinService: '/admin/sync-moa-nesin-service',
    createService: '/foundation/service/create',
    foundationLibrary: '/file/foundation-library',
    foundationLibraryFileOnly: '/file/foundation-library-file-only',
    etcLibrary: '/file/etc-library',
    deployApp: '/deploy/deploy-app',
    deployTestData: '/foundation/sync-from-test',
    syncFromTestToDev: '/foundation/sync-from-test-to-dev',
    getAppVersionHistory: '/deploy/version-update-history',
    getConsultingFileList: 'reflibrary/',
    downloadConsultingFile: 'reflibrary/download/',
    uploadConsultingFile: 'reflibrary/upload',
    updateConsultingRefTitle: 'reflibrary/update-reftitle',
    updateConsultingRefNo: 'reflibrary/update-refno',
    chartData: '/app-setup/chartdata',
    deleteConsultingFile: 'reflibrary/delete',
    detailpage: '/app-setup/detailpage',
    duplicateDetailpage: '/app-setup/duplicate/detailpage',
    getFlutterCategory: '/custom-config/category',
    getFlutterRowInfo: '/custom-config/rows-info-hierarchy',
    flutterCustomConfig: '/custom-config',
  },
  admin: {
    getUnivList: '/admin/univlist',
    getServiceList: '/admin/service',
  },
};
