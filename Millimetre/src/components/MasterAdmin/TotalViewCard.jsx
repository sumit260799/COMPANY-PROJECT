import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';

export default function TotalViewCard() {
  return (
    <Card sx={{ display: 'flex', width: '45%', marginTop: '50px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography>Total Likes</Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
          >
            25.6K <FavoriteIcon sx={{ ml: 1 }} />
          </Typography>
          <Typography variant="body2">21% more than last month</Typography>
        </CardContent>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography>Page Views</Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
          >
            2.6M <BoltIcon sx={{ ml: 1 }} />
          </Typography>
          <Typography variant="body2">14% more than last month</Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
