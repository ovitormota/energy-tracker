import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface EnergyChartsProps {
  title: string;
  data: { name: string; value: number }[];
  colors: string[];
  formatNumber: (num: number) => string;
}

const EnergyCharts = ({
  title,
  data,
  colors,
  formatNumber,
}: EnergyChartsProps) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [
                  `${formatNumber(Number(value))} kW`,
                  "Potência",
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Grid>
  );
};

export default EnergyCharts;
