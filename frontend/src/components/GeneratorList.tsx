import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { EnergyGenerator } from "../types/EnergyGenerator";

interface GeneratorListProps {
  generators: EnergyGenerator[];
  formatNumber: (num: number) => string;
}

const GeneratorList = ({ generators, formatNumber }: GeneratorListProps) => {
  return (
    <Grid size={12}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Detalhes dos 5 principais geradores de energia do Brasil
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ overflowX: "auto" }}>
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& th": {
                padding: "12px 16px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              },
              "& td": {
                padding: "12px 16px",
                borderBottom: "1px solid #ddd",
              },
              "& td:nth-of-type(6)": {
                textAlign: "right",
                fontWeight: "bold",
              },
            }}
          >
            <Box component="thead">
              <Box component="tr">
                <Box component="th">Nome</Box>
                <Box component="th">Empresa</Box>
                <Box component="th">Estado</Box>
                <Box component="th">Tipo Combustível</Box>
                <Box component="th">Tipo Geração</Box>
                <Box component="th" sx={{ textAlign: "right" }}>
                  Potência (kW)
                </Box>
                <Box component="th">Status</Box>
              </Box>
            </Box>
            <Box component="tbody">
              {generators.map((gen) => (
                <Box component="tr" key={gen.id}>
                  <Box component="td">{gen.name}</Box>
                  <Box component="td">{gen.companyName}</Box>
                  <Box component="td">{gen.state}</Box>
                  <Box component="td">{gen.fuelType}</Box>
                  <Box component="td">{gen.generationType}</Box>
                  <Box component="td">{formatNumber(Number(gen.powerKw))}</Box>
                  <Box component="td">
                    <Box
                      component="span"
                      sx={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor:
                          gen.status === "Ativo" ? "#e6f7ed" : "#ffeaea",
                        color: gen.status === "Ativo" ? "#00a651" : "#ff4d4d",
                      }}
                    >
                      {gen.status || "N/A"}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default GeneratorList;
