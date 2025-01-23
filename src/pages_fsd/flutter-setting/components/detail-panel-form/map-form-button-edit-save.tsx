import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { MapEditSaveButtonClass } from '../../constants';
import { UseMapFormReturn } from '../../hooks';

type MapFormEditSaveButtonProps = {
  mapHookValues: UseMapFormReturn;
  index: number;
};

export const MapFormEditSaveButton = ({
  mapHookValues,
  index,
}: MapFormEditSaveButtonProps) => {
  const {
    handleEditInput,
    handleConfirm,
    handleDelete,
    isEditObj,
    isDisabled,
  } = mapHookValues;

  if (isDisabled) return null;

  const isEdit = !isEditObj[index];
  const buttonsMap = [
    {
      title: isEdit ? '수정' : '저장',
      icon: isEdit ? (
        <ModeEditIcon sx={MapEditSaveButtonClass} />
      ) : (
        <DoneIcon sx={MapEditSaveButtonClass} />
      ),
      id: isEdit ? `editID-${index}` : `confirmID-${index}`,
      onClick: isEdit ? handleEditInput : handleConfirm,
    },
    {
      title: '삭제',
      icon: <DeleteIcon sx={MapEditSaveButtonClass} />,
      id: `deleteID-${index}`,
      onClick: handleDelete,
    },
  ];

  return (
    <Stack direction={'row'}>
      {buttonsMap.map((button, index) => (
        <Tooltip title={button.title} placement="top" key={index}>
          <IconButton
            size="small"
            id={button.id}
            onClick={button.onClick}
            disableRipple
          >
            {button.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
};
