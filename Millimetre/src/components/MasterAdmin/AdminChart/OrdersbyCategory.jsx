import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

export default function OrdersbyCategory() {
  return (
    <Box sx={{backgroundColor:"white",width:"50%",borderRadius:"10px"}}>
    <Typography variant='h4' sx={{textAlign:"center"}}>Orders by Category</Typography>
    <PieChart
    width={700}
    height={400}
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Electronics' },
            { id: 1, value: 15, label: 'Home Applicances' },
            { id: 2, value: 20, label: 'Beauty' },
            { id: 3, value: 10, label: 'Furniture' },
            { id: 4, value: 15, label: 'Watches' },
            { id: 5, value: 20, label: 'Apparel' },
          ],
        },
      ]}
      
    />
    </Box>
  );
}