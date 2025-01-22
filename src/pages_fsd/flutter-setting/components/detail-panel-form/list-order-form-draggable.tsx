import { Draggable, DroppableProvided } from '@hello-pangea/dnd';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Chip, Stack } from '@mui/material';

type ListOrderFormDraggableProps = {
  provided: DroppableProvided;
  isDisabled: boolean;
  orderList: string[];
};

export const ListOrderFormDraggable = ({
  provided,
  isDisabled,
  orderList,
}: ListOrderFormDraggableProps) => {
  return (
    <>
      {orderList.map((child: string, index: number) => (
        <Draggable
          key={child}
          draggableId={child}
          index={index}
          isDragDisabled={isDisabled}
        >
          {(provided) => (
            <Stack
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              direction={'row'}
              alignItems={'center'}
              spacing={1}
            >
              {!isDisabled && (
                <FiberManualRecordIcon sx={{ fontSize: '.4rem' }} />
              )}
              <Chip
                label={`${child}`}
                size="small"
                sx={{ paddingRight: '.1rem' }}
              />
            </Stack>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </>
  );
};
