import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';

import { loadingButtonStyle } from '../../constants';
type AddFormButtonProps = {
  handleSubmit: () => void;
  isAddServiceLoading: boolean;
};

export const AddFormButton = ({
  handleSubmit,
  isAddServiceLoading,
}: AddFormButtonProps) => {
  return (
    <LoadingButton
      variant="contained"
      sx={loadingButtonStyle}
      type="submit"
      disableElevation
      onClick={handleSubmit}
      loading={isAddServiceLoading}
    >
      <AddIcon />
    </LoadingButton>
  );
};
