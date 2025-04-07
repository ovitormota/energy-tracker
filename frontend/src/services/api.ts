import axios from "axios";
import { EnergyGenerator } from "../types/EnergyGenerator";

const API_URL = "http://localhost:8080/energy-generators/top5";

export const fetchTop5Generators = async (): Promise<EnergyGenerator[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
