import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import { SyntheticEvent } from 'react';
import { Stack, Typography } from '@mui/material';
import { FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';

const SettingList = () => {
  const { setSelectedCategory, flutterSettingList } = useFlutterSetting();

  const handleOnClick = (event: SyntheticEvent, itemId: string, isSelected: boolean) => {
    setSelectedCategory(itemId);
  };

  return (
    <Stack spacing={2}>
      <Typography variant={'body1'}>카테고리 목록</Typography>
      <SimpleTreeView onItemSelectionToggle={handleOnClick}>
        {flutterSettingList.map((parent: FlutterSetting, parentIndex: number) => {
          const { Category: parentCategory, children: parentChildren } = parent;
          return (
            <TreeItem2 itemId={parentCategory} label={parentCategory} key={parentIndex}>
              {parentChildren &&
                parentChildren.map((child, childIndex) => {
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
