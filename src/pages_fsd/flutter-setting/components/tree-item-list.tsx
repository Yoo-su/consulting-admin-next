import { Stack, Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { SyntheticEvent } from 'react';

import { EmptyCover } from '@/shared/components';

import { useFlutterSetting } from '../hooks';
import { FlutterSetting } from '../models';
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
                console.log('child', child, child.children);
                return (
                  <TreeItem2
                    itemId={`${child.Category}/${child.Title}`}
                    label={
                      <TreeItemLable
                        category={child.Title}
                        description={child.Description}
                        koreanTitle={child.KoreanTitle}
                      />
                    }
                    key={childIndex}
                    style={{
                      backgroundColor: isChildEdited ? '#FAFAFA' : 'inherit',
                    }}
                  >
                    {child.children &&
                      objectLength > 1 &&
                      child.children.map((grandChild, grandChildIndex) => {
                        const isGrandChildEdited = checkChildEdited(
                          grandChild,
                          filteredSettingList
                        );
                        return (
                          <TreeItem2
                            itemId={`${child.Category}/${child.Title}/${grandChild.Title}`}
                            label={
                              <TreeItemLable
                                category={grandChild.Title}
                                description={grandChild.Description}
                                koreanTitle={grandChild.KoreanTitle}
                                isGrand
                              />
                            }
                            key={grandChildIndex}
                            style={{
                              backgroundColor: isGrandChildEdited
                                ? '#FAFAFA'
                                : 'inherit',
                            }}
                          />
                        );
                      })}
                  </TreeItem2>
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
