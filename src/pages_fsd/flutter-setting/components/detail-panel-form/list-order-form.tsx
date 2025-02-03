import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { useFlutterSetting } from '../../hooks';
import { FormItemProps } from '../../models';
import { getInitialValue, getItemValue } from '../../services';
import { ListOrderFormDraggable } from './list-order-form-draggable';

export const ListOrderForm = ({ item, path, handleEdit, isDisabled }: FormItemProps) => {
  const { transferDefaultValue, OriginalRowValue, RowIdx, RowValue } = item;
  const { addToEditedList } = useFlutterSetting();
  const [orderList, setOrderList] = useState<string[]>(getItemValue(RowValue, transferDefaultValue));

  const initialValue = getInitialValue(transferDefaultValue, OriginalRowValue);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const dupList = [...orderList];
    const [removed] = dupList.splice(source.index, 1);
    dupList.splice(destination.index, 0, removed);
    handleEdit(path, `[${dupList}]`);
    addToEditedList({
      RowIdx,
      RowValue: `[${dupList}]`,
      InitialValue: initialValue,
    });
    setOrderList(dupList);
  };

  useEffect(() => {
    setOrderList(getItemValue(RowValue, transferDefaultValue));
  }, [RowValue]);

  return (
    <Stack direction={'column'} alignItems={'flex-start'} sx={{ margin: '.5rem 0 0 .5rem' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef} spacing={1}>
              <ListOrderFormDraggable provided={provided} isDisabled={isDisabled} orderList={orderList} />
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
  );
};
