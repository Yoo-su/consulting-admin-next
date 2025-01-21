import { FlutterRowInfo, FlutterSetting } from '../../models';
import { TreeItemChildrenCustom } from './tree-item-children-custom';

type TreeItemChildrenProps = {
  children: FlutterRowInfo[];
  filteredSettingList: FlutterSetting[];
};

export const TreeItemChildren = ({
  children,
  filteredSettingList,
}: TreeItemChildrenProps) => {
  if (!children) return null;
  return (
    <>
      {children.map((child, childIndex) => {
        const objectLength = child.children.filter(
          (c) =>
            c.Type === 'object' ||
            c.Type === 'list-order' ||
            c.Type === 'select'
        ).length;
        const newList = filteredSettingList.filter(
          (list) => list.Category == child.Category
        );
        return (
          <TreeItemChildrenCustom
            child={child}
            newList={newList}
            objectLength={objectLength}
            key={childIndex}
          />
        );
      })}
    </>
  );
};
