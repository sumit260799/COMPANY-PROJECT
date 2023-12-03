import React, { useState } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800];
const xLabels = [
  'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July',
  'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function Revenue() {
  const [timePeriod, setTimePeriod] = useState('3Months');

  const getDataForTimePeriod = (period) => {
    if (period === '3Months') {
      return {
        labels: xLabels.slice(-3),
        pData: pData.slice(-3),
        uData: uData.slice(-3),
      };
    } else if (period === '6Months') {
      return {
        labels: xLabels.slice(-6),
        pData: pData.slice(-6),
        uData: uData.slice(-6),
      };
    } else if (period === '1Year') {
      return {
        labels: xLabels,
        pData: pData,
        uData: uData,
      };
    }
  };

  const [filteredData, setFilteredData] = useState(getDataForTimePeriod(timePeriod));

  const handleFilter = (filter) => {
    const data = getDataForTimePeriod(filter);
    setFilteredData(data);
    setTimePeriod(filter);
  };

  return (
    <Box sx={{ backgroundColor: "white", textAlign: "center", borderRadius: "10px" }}>
      <Typography variant='h6'>Revenue</Typography>
      <Box sx={{ marginTop: '20px' }}>
        <Select
          label="Select Time Period"
          value={timePeriod}
          onChange={(event) => handleFilter(event.target.value)}
        >
          <MenuItem value="3Months">Last 3 Months</MenuItem>
          <MenuItem value="6Months">Last 6 Months</MenuItem>
          <MenuItem value="1Year">Last 1 Year</MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <BarChart
          width={600}
          height={400}
          series={[
            { data: filteredData.pData, label: 'pv', id: 'pvId' },
            { data: filteredData.uData, label: 'uv', id: 'uvId' },
          ]}
          xAxis={[{ data: filteredData.labels, scaleType: 'band' }]}
        />
      </Box>
      
    </Box>
  );
}
