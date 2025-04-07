import { Card, CardContent, Grid, Typography } from "@mui/material";

interface StatsCardsProps {
  generatorsCount: number;
  totalPower: number;
  fuelTypeCount: number;
  formatNumber: (num: number) => string;
}

const StatsCards = ({
  generatorsCount,
  totalPower,
  fuelTypeCount,
  formatNumber,
}: StatsCardsProps) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Card elevation={3} sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="textSecondary">
              Geradores Analisados
            </Typography>
            <Typography
              variant="h4"
              color="secondary"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              {generatorsCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Card elevation={3} sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="textSecondary">
              Potência Total
            </Typography>
            <Typography
              variant="h4"
              color="primary"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              {formatNumber(totalPower)} kW
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Card elevation={3} sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="textSecondary">
              Tipos de Combustível
            </Typography>
            <Typography
              variant="h4"
              sx={{ mt: 2, fontWeight: "bold", color: "#FF8042" }}
            >
              {fuelTypeCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default StatsCards;
