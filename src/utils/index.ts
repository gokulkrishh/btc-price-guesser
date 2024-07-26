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

export const isTimeLimitElapsed = (time: string, limit: number = 60000) => {
  const isElapsed = new Date().getTime() - limit * 2;
  return new Date(time).getTime() > isElapsed;
};
