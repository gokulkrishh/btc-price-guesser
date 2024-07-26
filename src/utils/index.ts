import { DataItem } from 'types/data';

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

export const isTimeLimitElapsed = (
  time: string | undefined,
  limit: number,
): boolean => {
  if (!time) return false;
  const isElapsed = new Date().getTime() - limit;
  return new Date(time).getTime() < isElapsed;
};

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
