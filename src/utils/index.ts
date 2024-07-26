import { DataItem, PriceResponse } from 'types/data';

export const dateOptions = {
  day: '2-digit',
  month: 'short',
  year: '2-digit',
} as Intl.DateTimeFormatOptions;

export const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
} as Intl.DateTimeFormatOptions;

export const formatDate = (
  dateStr: string,
  options: Intl.DateTimeFormatOptions = dateOptions,
): string => {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateStr));
};

export function formatCurrency(
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD',
): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    amount,
  );
}

type OrderType = 'asc' | 'desc';

export const sortByKey = (
  array: DataItem[],
  key: keyof DataItem,
  order: OrderType = 'asc',
): DataItem[] => {
  return array.sort((a, b) => {
    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      if (order === 'asc') {
        return a[key].localeCompare(b[key]);
      }
      return b[key].localeCompare(a[key]);
    }
    return 0;
  });
};

export type ReturnOfTransformData = {
  price: number;
  updatedAt: string;
} | null;

export const transformData = (
  data: PriceResponse | null,
): ReturnOfTransformData => {
  if (!data) {
    return null;
  }
  return {
    price: data?.bpi?.USD?.rate_float,
    updatedAt: data?.time?.updated,
  };
};

export const getElapsedTime = (createdAt: string | null): number => {
  if (!createdAt) {
    return 0;
  }
  const currentTime = new Date().getTime();
  const createdAtTime = new Date(createdAt).getTime();
  return Math.floor((currentTime - createdAtTime) / 1000);
};
