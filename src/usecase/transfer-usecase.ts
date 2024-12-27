
export class TransferUseCase {
  execute({ date, pixKey, value, dueDate }: Input) {
    
  };
}


export type Input = {
  value: number;
  pixKey: string;
  date: string;
  dueDate?: string;
};
