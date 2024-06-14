import { Divider, IconButton, TextField, Tooltip, Stack, Typography, FormGroup } from '@mui/material';
import { useState, KeyboardEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useOutsideClick } from '@/shared/hooks/use-outside-click';

const AddSetting = () => {
  const [isAdd, setIsAdd] = useState(false);

  const inputRef = useOutsideClick(() => {
    setIsAdd(false);
  });

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Enter');
      // Add category
      setIsAdd(false);
    }
  };

  return (
    <>
      {isAdd && (
        <Stack direction={'column'} alignItems={'center'} ref={inputRef}>
          <FormGroup></FormGroup>
        </Stack>
      )}
      <Divider variant="middle" />
      <Tooltip title="카테고리 추가" placement="top">
        <IconButton sx={{ borderRadius: '5%', backgroundColor: '#FAFAFA' }} onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default AddSetting;
