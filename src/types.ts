

export interface Order {
  id: number;
  method: PaymentMethod;
  status: Status;
  orderItems: Array<Item>;
}