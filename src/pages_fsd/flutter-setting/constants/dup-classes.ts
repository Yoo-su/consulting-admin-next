import { ServiceTypeChip } from '@/shared/constants';

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
