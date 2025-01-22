import styled from '@emotion/styled';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';

export const StyledTreeItem = styled(TreeItem2)`
  &.custom-tree-item > .MuiTreeItem-content {
    background-color: inherit;
  }

  &.custom-tree-item.edited > .MuiTreeItem-content {
    background-color: #fafafa;
  }
`;
