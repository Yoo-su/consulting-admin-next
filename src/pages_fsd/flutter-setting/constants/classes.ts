import { ServiceTypeChip } from '@/shared/constants';

export const ContainerClass = {
  mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  borderRadius: '1rem',
  p: 2,
  maxHeight: '75vh',
};

export const SwitchClass = {
  marginRight: '2px',
  '& .Mui-checked': {
    color: '#fff',
  },
  '& .Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#000',
  },
};

export const DetailClass = {
  minWidth: '100%',
  height: '73vh',
  overflowY: 'auto',
  paddingBottom: '1rem',
};

export const EmptyCoverClass = {
  width: '100%',
  minHeight: '400px',
  position: 'relative',
};

export const DupBtnClass = {
  padding: '2px 4px 0',
  marginBottom: '2px',
  backgroundColor: '#2C4059',
  color: '#fafafa',
  '&:hover': {
    backgroundColor: '#2C4059',
    color: '#fafafa',
  },
};

export const DupDialogCancelBtn = {
  color: '#2C4059',
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

export const DupDialogConfirmBtn = {
  backgroundColor: '#2C4059',
  color: '#fafafa',
  '&:hover': {
    backgroundColor: '#2C4059',
    color: '#fafafa',
  },
};

export const DupDialogOptionLabelClass = (serviceID: string) => ({
  paddingLeft: serviceID ? '5rem' : '0',
  display: 'flex',
  gap: 5,
});

export const DupDialogOptionLabelChipClass = (isSusi: number) => ({
  color: ServiceTypeChip.color[isSusi],
  bgcolor: ServiceTypeChip.bgcolor[isSusi],
  '& .MuiChip-label': {
    fontSize: 'x-small',
  },
});
