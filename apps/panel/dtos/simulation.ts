export type SimulationDTO = {
  id_simulation: string,
  id_vehicle: string,
  total_cost: number,
  total_credit_units: number,
  year: number,
  created_at: string,
  vehicle: {
    renavam: string,
    license_plate: string,
    category: string,
    state: string,
  }
}