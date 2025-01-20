import AdbIcon from '@mui/icons-material/Adb';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';

export const OS_TYPE = {
  PWA: 'O',
  APK: 'A',
  PC: 'P',
} as const;

export const OS_OPTIONS = [
  {
    label: 'PWA 주소',
    value: OS_TYPE.PWA,
    icon: AlternateEmailRoundedIcon,
    iconColor: '#2C4059',
    marginRight: '0.2rem',
    getDisabled: (isNew: boolean) => isNew,
  },
  {
    label: '안드로이드 APK',
    value: OS_TYPE.APK,
    icon: AdbIcon,
    iconColor: '#7CB342',
    marginRight: '0.1rem',
    getDisabled: (isNew: boolean) => !isNew,
  },
  {
    label: '데스크탑 APP',
    value: OS_TYPE.PC,
    icon: DesktopWindowsIcon,
    iconColor: '#1D2951',
    marginRight: '0.1rem',
    getDisabled: (isNew: boolean) => !isNew,
  },
] as const;
