export interface EnergyGenerator {
    id: number;
    name: string;
    state: string;
    fuelType: string;
    generationType: string;
    powerKw: number;
    companyName: string;
    connectionVoltage?: number;
    connectionName?: string;
    status?: string;
  }
  