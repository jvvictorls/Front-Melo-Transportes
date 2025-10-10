export type SuppliesType = {
  id: number;
  name: string;
  unity: string;
  quantity: number;
  unity_price: number;
  total_price: number;
  fiscal_note: string;
  vehicle: {
    id: number;
    model: string;
    plate: string;
  }
  created_at: Date;
  updated_at: Date;
};
