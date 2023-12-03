import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button, Divider } from '@mui/material';

export default function AmountCard() {
  
    
  return (
    <Card sx={{ display: 'flex',width:"45%" ,marginTop:"50px"}}>
      <Box sx={{ display: 'flex', flexDirection: 'column',width:"50%" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography>Amount to be Collected</Typography>
          <Typography variant='h5' sx={{fontWeight:"bold"}}>$25,600</Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button variant="contained">view users</Button>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ display: 'flex', flexDirection: 'column',width:"50%" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography>Cash in hand</Typography>
          <Typography variant='h5' sx={{fontWeight:"bold"}}>$5,600</Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button variant="contained">view members</Button>
        </Box>
      </Box>
      
    </Card>
  );
}