import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { SyntheticEvent } from 'react';

import { useFlutterSetting } from '../../hooks';
import { FlutterSetting } from '../../models';
import { EmptyList } from './empty-list';
import { TreeItemChildren } from './tree-item-children';

type TreeItemListProps = {
  filteredList: FlutterSetting[];
};

export const TreeItemList = ({ filteredList }: TreeItemListProps) => {
  const { setSelectedCategory, filteredSettingList } = useFlutterSetting();

  const handleOnClick = (event: SyntheticEvent, itemId: string) => {
    setSelectedCategory(itemId);
  };

  return (
    <SimpleTreeView
      onItemSelectionToggle={handleOnClick}
      sx={{ overflowY: 'auto', height: '68vh', paddingBottom: '1rem' }}
    >
      {filteredList.map((parent: FlutterSetting, parentIndex: number) => {
        return (
          <TreeItemChildren
            parent={parent}
            filteredSettingList={filteredSettingList}
            key={parentIndex}
          />
        );
      })}
      <EmptyList isShow={filteredList.length === 0} />
    </SimpleTreeView>
  );
};
