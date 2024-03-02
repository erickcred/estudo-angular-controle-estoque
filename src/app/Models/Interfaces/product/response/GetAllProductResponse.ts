export interface GetAllProductResponse {
  id: string;
  name: string;
  price: string;
  description: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  category_id: {
    id: string;
    name: string;
  };
}
