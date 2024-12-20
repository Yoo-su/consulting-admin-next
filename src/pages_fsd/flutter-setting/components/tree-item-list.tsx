import { Stack, Typography } from '@mui/material';
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
                const isChildEdited = checkChildEdited(
                  child,
                  filteredSettingList
                );
                const objectLength = child.children.filter(
                  (c) =>
                    c.Type === 'object' ||
                    c.Type === 'list-order' ||
                    c.Type === 'select'
                ).length;

                return (
                  <CustomTreeItem
                    key={childIndex}
                    item={child}
                    itemId={`${child.Category}/${child.Title}`}
                    isEdited={isChildEdited}
                  >
                    {child.children &&
                      objectLength > 1 &&
                      child.children.map((grandChild, grandChildIndex) => {
                        const isGrandChildEdited = checkChildEdited(
                          grandChild,
                          filteredSettingList
                        );
                        return (
                          <CustomTreeItem
                            key={grandChildIndex}
                            item={grandChild}
                            itemId={`${child.Category}/${child.Title}/${grandChild.Title}`}
                            isEdited={isGrandChildEdited}
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
}: {
  category: string;
  description: string;
  koreanTitle?: string;
  isGrand?: boolean;
}) => {
  return (
    <Stack>
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
  isGrand,
  isEdited,
  ...props
}: {
  children?: ReactNode;
  item: FlutterRowInfo;
  isGrand?: boolean;
  isEdited?: boolean;
} & TreeItem2Props) => {
  const { style: propStyle, ...other } = props;
  return (
    <TreeItem2
      label={
        <TreeItemLable
          category={item.Title}
          description={item.Description}
          koreanTitle={item.KoreanTitle}
          isGrand={isGrand}
        />
      }
      style={{
        ...propStyle,
        backgroundColor: isEdited ? '#FAFAFA' : 'inherit',
      }}
      {...other}
    >
      {children}
    </TreeItem2>
  );
};
