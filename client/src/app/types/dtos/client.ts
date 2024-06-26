export type TClientDTO = {
  id: number;
  name: string;
  address: string;
  description: string;
  createdOn: Date;
  updatedOn?: Date;
  createdBy: string;
  updatedBy?: string;
};

export type TPostClientDTO = {
  name: string;
  address: string;
  description: string;
};
