import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { SyntheticEvent } from 'react';

import { useFlutterSetting } from '../../hooks';
import { FlutterSetting } from '../../models';
import { EmptyList } from './empty-list';
import { TreeItemChildren } from './tree-item-children';
import { TreeItemLable } from './tree-item-label';

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
        const { Category, children, Description } = parent;
        return (
          <TreeItem2
            itemId={Category}
            label={
              <TreeItemLable category={Category} description={Description} />
            }
            key={parentIndex}
          >
            <TreeItemChildren
              children={children}
              filteredSettingList={filteredSettingList}
            />
          </TreeItem2>
        );
      })}
      <EmptyList isShow={filteredList.length === 0} />
    </SimpleTreeView>
  );
};
