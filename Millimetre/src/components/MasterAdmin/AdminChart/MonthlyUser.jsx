import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';

export default function MonthlyUser() {
  return (
    <Box sx={{backgroundColor:"white",textAlign:"center",borderRadius:"10px"}}>
    <Typography variant='h6'>Montly Active Users (in K)</Typography>
    <Box
        sx={{
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={600}
      height={400}

    />
    </Box>
    </Box>
  );
}