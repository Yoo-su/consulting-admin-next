import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';

import { FlutterSetting } from '../../models';
import { getListByCategory } from '../../services';
import { TreeItemChildrenCustom } from './tree-item-children-custom';
import { TreeItemLable } from './tree-item-children-label';

type TreeItemChildrenProps = {
  parent: FlutterSetting;
  filteredSettingList: FlutterSetting[];
};

export const TreeItemChildren = ({ parent, filteredSettingList }: TreeItemChildrenProps) => {
  const { Category, children } = parent;

  if (!children) return null;
  return (
    <TreeItem2 itemId={Category} label={<TreeItemLable category={Category} />}>
      {children.map((child, childIndex) => (
        <TreeItemChildrenCustom
          child={child}
          newList={getListByCategory(filteredSettingList, child.Category)}
          key={childIndex}
        />
      ))}
    </TreeItem2>
  );
};
