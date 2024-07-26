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

type Usd = {
  code: string;
  rate: string;
  description: string;
  rate_float: number;
};

type Btc = {
  code: string;
  rate: string;
  description: string;
  rate_float: number;
};

export type PriceResponse = {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  bpi: {
    USD: Usd;
    BTC: Btc;
  };
};
