export type GenerateOrderByCreditCardRequest = {
  simulation_id: string,
  type: string,
  customer: {
    name: string,
    document: string,
    phone: string,
    email: string
  },
  card: {
    number: string,
    name: string,
    cvv: string,
    exp_month: string,
    exp_year: string
  }
}

export type GenerateOrderByPixRequest = {
  simulation_id: string,
  type: string,
  customer: {
    name: string,
    document: string,
    phone: string,
    email: string,
  }
}