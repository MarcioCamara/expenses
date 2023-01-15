export interface Revenue {
  id?: string;
  month: Date,
  name: string,
  value: number,
  checked?: boolean;
  isBeingEdited?: boolean;
}