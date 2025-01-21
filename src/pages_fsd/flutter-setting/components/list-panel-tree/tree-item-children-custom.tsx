import { FlutterRowInfo, FlutterSetting } from '../../models';
import { getChildrenByRowIdx } from '../../services';
import { CustomTreeItem } from './custom-tree-item';

type TreeItemChildrenCustomProps = {
  child: FlutterRowInfo;
  newList: FlutterSetting[];
};

export const TreeItemChildrenCustom = ({
  child,
  newList,
}: TreeItemChildrenCustomProps) => {
  const { children, Category, Title } = child;
  const countableTypes = ['object', 'list-order', 'select'];
  const getLength = (children: FlutterRowInfo[]) =>
    children.filter((child) => countableTypes.includes(child.Type)).length;

  const isRender = getLength(children) > 1 && children;

  return (
    <CustomTreeItem
      item={child}
      itemId={`${Category}/${Title}`}
      filteredList={newList}
      isDeep
    >
      {isRender &&
        children.map((grandChild, grandChildIndex) => (
          <CustomTreeItem
            key={grandChildIndex}
            item={grandChild}
            itemId={`${Category}/${Title}/${grandChild.Title}`}
            filteredList={getChildrenByRowIdx(newList, grandChild.RowIdx)}
            isGrand
          />
        ))}
    </CustomTreeItem>
  );
};
