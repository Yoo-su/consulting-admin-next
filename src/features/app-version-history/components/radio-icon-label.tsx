import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type RadioIconLabelProps = {
  label: string;
  value: string;
  Icon: any;
  disabled?: boolean;
};

const RadioIconLabel = ({
  label,
  value,
  Icon,
  disabled,
}: RadioIconLabelProps) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio size="medium" />}
      disabled={disabled}
      label={
        <Stack direction={'row'} alignItems={'center'}>
          {Icon}
          <Typography variant="body2">{label}</Typography>
        </Stack>
      }
    />
  );
};

export default RadioIconLabel;
