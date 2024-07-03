import { SyntheticEvent, memo } from 'react';

import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import { FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';
import { checkChildEdited } from '@/features/dashboard/services/flutter-setting/check-child-edited';

type TreeItemListProps = {
  filteredList: FlutterSetting[];
};

const TreeItemList = ({ filteredList }: TreeItemListProps) => {
  const { setSelectedCategory, filteredSettingList } = useFlutterSetting();

  const handleOnClick = (event: SyntheticEvent, itemId: string) => {
    setSelectedCategory(itemId);
  };

  return (
    <SimpleTreeView onItemSelectionToggle={handleOnClick}>
      {filteredList.map((parent: FlutterSetting, parentIndex: number) => {
        const { Category, children } = parent;
        return (
          <TreeItem2 itemId={Category} label={Category} key={parentIndex}>
            {children &&
              children.map((child, childIndex) => {
                const isChildEdited = checkChildEdited(child, filteredSettingList);
                return (
                  <TreeItem2
                    itemId={`${child.Category}/${child.Title}`}
                    label={`${child.Title}`}
                    key={childIndex}
                    style={{ backgroundColor: isChildEdited ? '#FAFAFA' : 'inherit' }}
                  />
                );
              })}
          </TreeItem2>
        );
      })}
    </SimpleTreeView>
  );
};

export default memo(TreeItemList);
