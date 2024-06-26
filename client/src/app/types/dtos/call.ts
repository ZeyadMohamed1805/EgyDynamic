export type TCall = {
  id: number;
  description: string;
  duration: number;
  madeOn: Date;
  isCompleted: boolean;
  type: number;
  createdOn: Date;
  updatedOn: Date;
  createdBy: string;
  updatedBy: string;
};

export type TCallDTO = {
  totalCount: number;
  totalPages: number;
  data: TCall[];
};

export type TPostCallDTO = {
  description: string;
  duration: number;
  madeOn: Date;
  isCompleted: boolean;
  type: number;
  clientId: number;
};

export type TPutCallDTO = {
  id: number;
  description: string;
  duration: number;
  madeOn: Date;
  isCompleted: boolean;
  type: number;
  clientId: number;
};
