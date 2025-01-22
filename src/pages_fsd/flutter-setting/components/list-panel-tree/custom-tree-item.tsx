import { TreeItem2Props } from '@mui/x-tree-view/TreeItem2';
import { ReactNode } from 'react';
import { FlutterRowInfo, FlutterSetting } from '../../models';
import { checkChildEdited } from '../../services';
import { TreeItemLable } from './tree-item-children-label';
import { StyledTreeItem } from './tree-item.styled';

export const CustomTreeItem = ({
  children,
  item,
  isGrand = false,
  isDeep = false,
  filteredList,
  ...props
}: {
  children?: ReactNode;
  item: FlutterRowInfo;
  isGrand?: boolean;
  isDeep?: boolean;
  filteredList: (FlutterSetting | FlutterRowInfo)[];
} & TreeItem2Props) => {
  const isEdited = checkChildEdited(item, filteredList, isDeep);
  return (
    <StyledTreeItem
      label={
        <TreeItemLable
          category={item.Title}
          koreanTitle={item.KoreanTitle}
          isGrand={isGrand}
        />
      }
      className={`custom-tree-item ${isEdited ? 'edited' : ''}`}
      {...props}
    >
      {children}
    </StyledTreeItem>
  );
};
