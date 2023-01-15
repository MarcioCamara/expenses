export interface Expense {
  id?: string;
  month: Date,
  name: string,
  value: number,
  paymentSource: string,
  status: string,
  checked?: boolean;
  isBeingEdited?: boolean;
}