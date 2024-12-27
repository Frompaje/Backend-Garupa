export class TransferUseCase {
  execute({ date, pixKey, value, dueDate }: Input) {
    
  };
}

type Input = {
  value: number;
  pixKey: string;
  date: string;
  dueDate?: string;
};
