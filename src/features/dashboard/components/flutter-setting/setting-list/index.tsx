import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import { SyntheticEvent, useState, KeyboardEvent } from 'react';
import { Divider, IconButton, Stack, SvgIcon, TextField, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { mockData } from '../mock-data';
import { useOutsideClick } from '@/shared/hooks/use-outside-click';

const SettingList = () => {
  const { setSelectedCategory } = useFlutterSetting();
  const [isAdd, setIsAdd] = useState(false);

  const inputRef = useOutsideClick(() => {
    setIsAdd(false);
  });

  const handleOnClick = (event: SyntheticEvent, itemId: string, isSelected: boolean) => {
    setSelectedCategory(itemId);
  };
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
    <Stack spacing={2}>
      <Typography variant={'body1'}>카테고리 목록</Typography>
      <SimpleTreeView onItemSelectionToggle={handleOnClick}>
        {Object.keys(mockData).map((category, index) => {
          return (
            <TreeItem2 itemId={category} label={category} key={index}>
              {mockData[category] &&
                Object.keys(mockData[category]).map((subCategory, subIndex) => (
                  <TreeItem2 itemId={`${category}/${subCategory}`} label={subCategory} key={subIndex} />
                ))}
            </TreeItem2>
          );
        })}
        {isAdd && (
          <Stack direction={'row'} alignItems={'center'} sx={{ padding: '4px 7px' }}>
            <SvgIcon>
              <svg
                style={{ fontSize: '18px', width: '1em', height: '1em' }}
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="TreeViewExpandIconIcon"
              >
                <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </SvgIcon>
            <TextField
              ref={inputRef}
              size="small"
              sx={{
                '& .MuiInputBase-input': {
                  height: '1rem',
                  padding: '8.5px 11px',
                },
              }}
              onKeyUp={handleInputKey}
            />
          </Stack>
        )}
      </SimpleTreeView>
      <Divider variant="middle" />
      <Tooltip title="카테고리 추가" placement="top">
        <IconButton sx={{ borderRadius: '5%', backgroundColor: '#FAFAFA' }} onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default SettingList;
