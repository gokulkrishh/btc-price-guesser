export type DataItem = {
  id: string;
  guess: string;
  initialPrice: number;
  resolvedPrice: number | null;
  resolved: boolean | null;
  correct: boolean | null;
  score: number;
  createdAt: string;
  updatedAt: string;
};
