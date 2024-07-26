import { createContext, useContext, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from 'amplify/data/resource';

const client = generateClient<Schema>();

import { DataItem } from 'types/data';
import { sortByKey } from 'utils';

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
        const sortedData = sortByKey(
          [...data.items] as DataItem[],
          'createdAt',
          'desc',
        );
        setData(sortedData);
        setIsLoading(false);
      },
      error: (error) => {
        console.error('Unable to fetch data', error);
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
