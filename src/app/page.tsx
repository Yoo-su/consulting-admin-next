import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <Grid container spacing={3} sx={{ bgcolor: '#F3F4F5' }}>
      <Grid>
        <Typography variant='h3'>Main</Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
