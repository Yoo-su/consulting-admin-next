import { Stack, styled, Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem2, TreeItem2Props } from '@mui/x-tree-view/TreeItem2';
import { ReactNode, SyntheticEvent } from 'react';

import { EmptyCover } from '@/shared/components';

import { useFlutterSetting } from '../hooks';
import { FlutterRowInfo, FlutterSetting } from '../models';
import { checkChildEdited } from '../services';

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
            {children &&
              children.map((child, childIndex) => {
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
                  <CustomTreeItem
                    key={childIndex}
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
              })}
          </TreeItem2>
        );
      })}
      {filteredList.length == 0 && (
        <Stack
          sx={{
            width: '100%',
            minHeight: '400px',
            position: 'relative',
          }}
        >
          <EmptyCover message={'예외 설정이 없습니다'} />
        </Stack>
      )}
    </SimpleTreeView>
  );
};

const TreeItemLable = ({
  category,
  description,
  koreanTitle,
  isGrand,
  style,
}: {
  category: string;
  description: string;
  koreanTitle?: string;
  isGrand?: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <Stack style={{ ...style }}>
      <Typography
        variant={isGrand ? 'body2' : koreanTitle ? 'subtitle2' : 'body1'}
        sx={{ fontWeight: !isGrand && !koreanTitle ? 'bold' : 'normal' }}
      >
        {category}
      </Typography>
      {koreanTitle && (
        <Typography variant={'caption'} sx={{ color: 'gray' }}>
          {koreanTitle}
        </Typography>
      )}
    </Stack>
  );
};

const CustomTreeItem = ({
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
