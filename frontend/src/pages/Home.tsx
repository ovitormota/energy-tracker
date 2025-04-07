import { Box, CircularProgress, Grid } from "@mui/material";
import EnergyCharts from "../components/EnergyCharts";
import GeneratorList from "../components/GeneratorList";
import StatsCards from "../components/StatsCards";
import { useEnergyData } from "../hooks/useEnergyData";
import { COLORS } from "../utils/constants";
import { formatNumber } from "../utils/formatUtils";

const Home = () => {
  const { generators, loading, totalPower, fuelTypeData, stateData } =
    useEnergyData();

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {loading ? (
        <CircularProgress
          sx={{ display: "block", margin: "auto", mt: "35vh" }}
        />
      ) : (
        <Grid container spacing={3}>
          <StatsCards
            generatorsCount={generators.length}
            totalPower={totalPower}
            fuelTypeCount={fuelTypeData.length}
            formatNumber={formatNumber}
          />
          <GeneratorList generators={generators} formatNumber={formatNumber} />
          <EnergyCharts
            title="Distribuição por Tipo de Combustível"
            data={fuelTypeData}
            colors={COLORS}
            formatNumber={formatNumber}
          />
          <EnergyCharts
            title="Distribuição por Estado"
            data={stateData}
            colors={COLORS}
            formatNumber={formatNumber}
          />
        </Grid>
      )}
    </Box>
  );
};

export default Home;
