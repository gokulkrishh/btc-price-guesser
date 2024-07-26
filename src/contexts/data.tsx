import { createContext, useContext, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from 'amplify/data/resource';

const client = generateClient<Schema>();

import { DataItem } from 'types/data';

type DataValue = {
  data: DataItem[];
  isLoading: boolean;
};

export const DataContext = createContext<DataValue | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: ProviderProps) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dataObserver = client.models.Data.observeQuery().subscribe({
      next: (data) => {
        setIsLoading(true);
        setData(data.items as DataItem[]);
        setIsLoading(false);
      },
      error: () => {
        console.error('Unable to update to latest score.');
      },
    });

    return () => dataObserver.unsubscribe();
  }, []);

  return (
    <DataContext.Provider value={{ data, isLoading }}>
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
