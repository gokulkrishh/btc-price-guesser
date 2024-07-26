import { createContext, useContext } from 'react';

type DataItem = {
  guess: string;
  initialPrice: number;
  resolvedPrice: number;
  resolved: boolean;
  correct: boolean;
  score: number;
};

type DataValue = {
  data: DataItem[];
  isLoading: boolean;
};

export const DataContext = createContext<DataValue | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: ProviderProps) => {
  return (
    <DataContext.Provider
      value={{
        data: [],
        isLoading: false,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error(`useScore must be used within a Data Context Provider.`);
  }

  return context as DataValue;
};
