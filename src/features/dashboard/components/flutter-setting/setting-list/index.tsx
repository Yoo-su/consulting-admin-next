import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';
import { FormControlLabel, FormGroup, Stack, Switch, Typography } from '@mui/material';
import { FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';

type SettingListProps = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  filteredList: FlutterSetting[];
};
const SettingList = ({ toggle, setToggle, filteredList }: SettingListProps) => {
  const { setSelectedCategory } = useFlutterSetting();

  const handleOnClick = (event: SyntheticEvent, itemId: string) => {
    setSelectedCategory(itemId);
  };

  const handleChange = (event: SyntheticEvent, value: boolean) => {
    setToggle(value);
  };

  return (
    <Stack spacing={2}>
      <Typography variant={'body1'}>카테고리 목록</Typography>
      <FormGroup sx={{ paddingLeft: '1rem' }}>
        <FormControlLabel
          control={<Switch size="small" sx={{ marginRight: '.5rem' }} />}
          label={toggle ? '예외처리' : '전체보기'}
          onChange={handleChange}
        />
      </FormGroup>
      <SimpleTreeView onItemSelectionToggle={handleOnClick}>
        {filteredList.map((parent: FlutterSetting, parentIndex: number) => {
          const { Category, children } = parent;
          return (
            <TreeItem2 itemId={Category} label={Category} key={parentIndex}>
              {children &&
                children.map((child, childIndex) => {
                  const { Category, Title } = child;
                  return <TreeItem2 itemId={`${Category}/${Title}`} label={Title} key={childIndex} />;
                })}
            </TreeItem2>
          );
        })}
      </SimpleTreeView>
    </Stack>
  );
};

export default SettingList;
