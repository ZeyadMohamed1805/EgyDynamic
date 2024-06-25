export type TColumnType = {
  name: string;
  completed: boolean;
  subColumns: { name: string; column: string; completed: boolean }[];
};
