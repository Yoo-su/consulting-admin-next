import { Stack, Typography } from '@mui/material';

type DetailTitleProps = {
  isTitle: boolean;
  category: string;
  description: string;
};

export const DetailTitle = ({
  isTitle,
  category,
  description,
}: DetailTitleProps) => {
  return (
    <Stack>
      {isTitle && (
        <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
          {category}
        </Typography>
      )}
      {description && (
        <Typography variant={'overline'}>{description}</Typography>
      )}
    </Stack>
  );
};
