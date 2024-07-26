import { createContext, useContext, useEffect, useState } from 'react';
import { PriceResponse } from 'types/data';
import { ReturnOfTransformData, transformData } from 'utils';

type PriceContextValue = {
  data: ReturnOfTransformData | null;
  isLoading: boolean;
  triggerFetch: () => Promise<void>;
};

export const PriceContext = createContext<PriceContextValue | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

const API_URL = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.join';

export const PriceProvider = ({ children }: ProviderProps) => {
  const [data, setData] = useState<ReturnOfTransformData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const triggerFetch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      const result = (await response.json()) as PriceResponse | null;
      const transformedData = transformData(result);
      setData(transformedData);
    } catch {
      //TODO: handle price api error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    triggerFetch();
  }, []);

  return (
    <PriceContext.Provider value={{ data, isLoading, triggerFetch }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error(`usePrice must be used within a Price Context Provider.`);
  }

  return context as PriceContextValue;
};
