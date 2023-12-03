import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/joy";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Earnings = () => {
  return (
    <>
      <div style={{ marginTop: "150px" }}>
        <div style={{ margin: "10px", textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Welcome to your insights
          </Typography>
          <Typography variant="body1">
            You'll find details on your shop here when you publish it
          </Typography>
        </div>

        <Divider />
        <div style={{ margin: "10px" }}>
          <div style={{ margin: "10px", textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Confirmed earnings
            </Typography>
            <Typography variant="body2">
              Comission from orders that have been shipped to customers more
              than 14 days ago and have not been paid out or refunded
            </Typography>
            <Typography variant="h3" sx={{ margin: "30px" }}>
              --
            </Typography>
          </div>
          <div style={{ margin: "10px", textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Pending earnings
            </Typography>
            <Typography variant="body2">
              Pending comission from orders that have been placed, not yet
              shipped, or shipped less than 14 days ago, and not paid out yet
            </Typography>
            <Typography variant="h3" sx={{ margin: "30px" }}>
              --
            </Typography>
          </div>
        </div>

        <Divider />
        <Box sx={{ flexGrow: 1, marginTop: "2rem" }}>
          <Grid container spacing={3}>
            <Grid item sm={12} lg={4}>
              <Box>
                <Typography variant="h6">Latest sales</Typography>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 200 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell align="right">Product</TableCell>
                        <TableCell align="right">Comission</TableCell>
                      </TableRow>
                    </TableHead>
                    {/* <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody> */}
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item sm={12} lg={4}>
              <Box>
                <Typography variant="h6">Most sold products</Typography>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 200 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">sold</TableCell>
                      </TableRow>
                    </TableHead>
                    {/* <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody> */}
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item sm={12} lg={4}>
              <Box>
                <Typography variant="h6">Most added to cart</Typography>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 200 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">times added</TableCell>
                      </TableRow>
                    </TableHead>
                    {/* <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody> */}
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Earnings;
