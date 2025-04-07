import { useEffect, useState } from "react";
import { fetchTop5Generators } from "../services/api";
import { EnergyGenerator } from "../types/EnergyGenerator";

export const useEnergyData = () => {
  const [generators, setGenerators] = useState<EnergyGenerator[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPower, setTotalPower] = useState(0);
  const [fuelTypeData, setFuelTypeData] = useState<
    { name: string; value: number }[]
  >([]);
  const [stateData, setStateData] = useState<{ name: string; value: number }[]>(
    []
  );

  useEffect(() => {
    fetchTop5Generators()
      .then((data) => {
        setGenerators(data);

        // Calcular potência total
        const total = data.reduce((sum, gen) => sum + Number(gen.powerKw), 0);
        setTotalPower(total);

        // Agrupar dados por tipo de combustível
        const fuelTypeMap = new Map<string, number>();
        data.forEach((gen) => {
          const currentValue = fuelTypeMap.get(gen.fuelType) || 0;
          fuelTypeMap.set(gen.fuelType, currentValue + Number(gen.powerKw));
        });
        const fuelTypeArray = Array.from(fuelTypeMap).map(([name, value]) => ({
          name,
          value,
        }));
        setFuelTypeData(fuelTypeArray);

        // Agrupar dados por estado
        const stateMap = new Map<string, number>();
        data.forEach((gen) => {
          const currentValue = stateMap.get(gen.state) || 0;
          stateMap.set(gen.state, currentValue + Number(gen.powerKw));
        });
        const stateArray = Array.from(stateMap).map(([name, value]) => ({
          name,
          value,
        }));
        setStateData(stateArray);
      })
      .finally(() => setLoading(false));
  }, []);

  return { generators, loading, totalPower, fuelTypeData, stateData };
};
