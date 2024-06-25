import { Chip, Stack } from '@mui/material';
import { useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FormItemProps } from '../types/flutter-setting-form.type';
import { getConvertedValue } from '@/shared/services/get-converted-value';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';

const ListOrderForm = ({ item, isEdit }: FormItemProps) => {
  const { transferDefaultValue, RowIdx, RowValue } = item;
  const { addToEditedSettingList } = useFlutterSetting();
  const [orderList, setOrderList] = useState(RowValue ? getConvertedValue(RowValue) : transferDefaultValue);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const dupList = [...orderList];
    const [removed] = dupList.splice(source.index, 1);
    dupList.splice(destination.index, 0, removed);
    addToEditedSettingList({ RowIdx, RowValue: `[${dupList}]` });
    setOrderList(dupList);
  };

  return (
    <Stack direction={'column'} alignItems={'flex-start'} sx={{ margin: '.5rem 0 0 .5rem' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef} spacing={1}>
              {orderList.map((child: string, index: number) => (
                <Draggable key={child} draggableId={child} index={index} isDragDisabled={!isEdit}>
                  {(provided) => (
                    <Stack
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      direction={'row'}
                      alignItems={'center'}
                      spacing={1}
                    >
                      <FiberManualRecordIcon sx={{ fontSize: '.4rem' }} />
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
