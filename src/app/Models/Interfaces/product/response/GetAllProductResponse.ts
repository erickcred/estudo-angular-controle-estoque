export interface GetAllProductResponse {
  id: string;
  name: string;
  price: number;
  description: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  category_id: {
    id: string;
    name: string;
  };
}
