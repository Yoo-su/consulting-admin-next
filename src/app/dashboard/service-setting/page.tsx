import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ServiceListTable from '@/features/dashboard/components/service-list-table';

const Page = () => {
  return (
    <Grid container spacing={3}>
      <Grid>
        <Typography variant="h5">서비스 설정</Typography>
        <ServiceListTable />
      </Grid>
    </Grid>
  );
};

export default Page;
