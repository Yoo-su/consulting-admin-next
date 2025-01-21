import { FlutterRowInfo, FlutterSetting } from '../../models';
import { CustomTreeItem } from './custom-tree-item';

type TreeItemChildrenCustomProps = {
  child: FlutterRowInfo;
  newList: FlutterSetting[];
  objectLength: number;
};

export const TreeItemChildrenCustom = ({
  child,
  newList,
  objectLength,
}: TreeItemChildrenCustomProps) => {
  return (
    <CustomTreeItem
      item={child}
      itemId={`${child.Category}/${child.Title}`}
      filteredList={newList}
      isDeep
    >
      {child.children &&
        objectLength > 1 &&
        child.children.map((grandChild, grandChildIndex) => {
          const newGrandChildList =
            newList[0]?.children.filter(
              (list) => list.RowIdx == grandChild.ParentIdx
            ) ?? [];
          return (
            <CustomTreeItem
              key={grandChildIndex}
              item={grandChild}
              itemId={`${child.Category}/${child.Title}/${grandChild.Title}`}
              filteredList={newGrandChildList}
              isGrand
            />
          );
        })}
    </CustomTreeItem>
  );
};
