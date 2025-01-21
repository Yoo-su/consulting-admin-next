import styled from '@emotion/styled';
import { TreeItem2, TreeItem2Props } from '@mui/x-tree-view/TreeItem2';
import { ReactNode } from 'react';
import { FlutterRowInfo, FlutterSetting } from '../../models';
import { checkChildEdited } from '../../services';
import { TreeItemLable } from './tree-item-label';

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
          description={item.Description}
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

const StyledTreeItem = styled(TreeItem2)`
  &.custom-tree-item > .MuiTreeItem-content {
    background-color: inherit;
  }

  &.custom-tree-item.edited > .MuiTreeItem-content {
    background-color: #fafafa;
  }
`;
