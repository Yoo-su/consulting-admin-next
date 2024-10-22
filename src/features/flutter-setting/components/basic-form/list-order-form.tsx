import { useEffect, useState } from 'react';
import { Chip, Stack } from '@mui/material';
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { getConvertedValue } from '@/shared/services';
import { useFlutterSetting } from '../../hooks';
import { FormItemProps } from '../../models';

const ListOrderForm = ({ item, path, handleEdit, isDisabled }: FormItemProps) => {
  const { transferDefaultValue, RowIdx, RowValue, OriginalRowValue } = item;
  const { addToEditedList } = useFlutterSetting();
  const [orderList, setOrderList] = useState(RowValue ? getConvertedValue(RowValue) : transferDefaultValue);

  const initialValue = OriginalRowValue ? OriginalRowValue : transferDefaultValue;

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const dupList = [...orderList];
    const [removed] = dupList.splice(source.index, 1);
    dupList.splice(destination.index, 0, removed);
    handleEdit(path, `[${dupList}]`);
    addToEditedList({ RowIdx, RowValue: `[${dupList}]`, InitialValue: initialValue });
    setOrderList(dupList);
  };
  useEffect(() => {
    if (RowValue) {
      setOrderList(getConvertedValue(RowValue));
    } else {
      setOrderList(transferDefaultValue);
    }
  }, [RowValue]);
  return (
    <Stack direction={'column'} alignItems={'flex-start'} sx={{ margin: '.5rem 0 0 .5rem' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef} spacing={1}>
              {orderList.map((child: string, index: number) => (
                <Draggable key={child} draggableId={child} index={index} isDragDisabled={isDisabled}>
                  {(provided) => (
                    <Stack
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      direction={'row'}
                      alignItems={'center'}
                      spacing={1}
                    >
                      {!isDisabled && <FiberManualRecordIcon sx={{ fontSize: '.4rem' }} />}
                      <Chip label={`${child}`} size="small" sx={{ paddingRight: '.1rem' }} />
                    </Stack>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
  );
};

export default ListOrderForm;
