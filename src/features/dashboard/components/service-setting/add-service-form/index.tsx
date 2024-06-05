import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { getCurrentServiceYear } from '@/features/dashboard/services/get-current-service-year';
import { ChangeEvent, useState } from 'react';
import { createNewService } from '@/features/dashboard/apis/create-new-service';
import toast from 'react-hot-toast';

const serviceTypeList = [
  { label: '수시', value: '1' },
  { label: '정시', value: '0' },
];

const AddServiceForm = ({ univID }: { univID: string }) => {
  const [serviceType, setServiceType] = useState('1');
  const currentServiceYear = getCurrentServiceYear();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setServiceType(event.target.value);
  };
  const handleSubmit = async () => {
    const newService = {
      SchoolYear: currentServiceYear,
      IsSusi: serviceType,
      UnivID: univID,
    };
    try {
      await createNewService(newService).then((res) => {
        if (res.status === 201) {
          toast.success('서비스가 추가되었습니다.');
        }
      });
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const textFieldStyle = {
    '& .MuiInputBase-root': {
      '&:before': {
        borderBottomStyle: 'hidden !important',
      },
    },
    '& .MuiInputBase-input': {
      maxWidth: '80px',
      padding: '0 .5rem',
      backgroundColor: '#fafafa',
      borderRadius: '.3rem',
      WebkitTextFillColor: '#424242 !important',
    },
  };

  return (
    <Paper sx={{ padding: '1rem' }}>
      <Stack direction={'row'} justifyContent={'space-evenly'} alignItems={'center'}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <InputLabel>서비스 년도</InputLabel>
          <TextField disabled variant="standard" value={currentServiceYear} sx={{ ...textFieldStyle }} size="small" />
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <InputLabel>서비스 유형</InputLabel>
          <TextField select value={serviceType} size="small" sx={{ minWidth: '150px' }} onChange={handleChange}>
            {serviceTypeList.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#2C4059',
            color: '#fafafa',
          }}
          type="submit"
          disableElevation
          onClick={handleSubmit}
        >
          <AddIcon />
        </Button>
      </Stack>
    </Paper>
  );
};

export default AddServiceForm;
