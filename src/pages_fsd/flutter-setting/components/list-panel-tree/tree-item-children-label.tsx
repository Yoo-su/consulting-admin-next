import { Stack, Typography } from '@mui/material';

export const TreeItemLable = ({
  category,
  koreanTitle,
  isGrand,
  style,
}: {
  category: string;
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
