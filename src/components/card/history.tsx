import clsx from 'clsx';
import { CalendarIcon, TimeIcon } from 'components/icons';
import { DataItem } from 'types/data';
import { dateOptions, formatCurrency, formatDate, timeOptions } from 'utils';

export default function HistoryCard({ data }: { data: DataItem }) {
  const isCorrectGuess = data.resolved && data.correct;
  const isUpWon = isCorrectGuess && data.guess === 'up';
  const isDownWon = isCorrectGuess && data.guess === 'down';

  return (
    <div className="flex flex-col px-4 p-3 bg-zinc-50 border w-full rounded-xl">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-3 text-zinc-600">
          <div className="flex items-center font-medium">
            <CalendarIcon className="w-4 h-4 mr-1.5 text-zinc-600" />{' '}
            <span className="text-sm mt-0.5">
              {formatDate(data.updatedAt, dateOptions)}
            </span>
          </div>
          <div className="flex items-center font-medium">
            <TimeIcon className="w-4 h-4 mr-1.5 text-zinc-600" />{' '}
            <span className="text-sm mt-0.5">
              {formatDate(data.updatedAt, timeOptions)}
            </span>
          </div>
        </div>

        <div className="font-semibold text-black tabular-nums">
          <span>{formatCurrency(data.resolvedPrice!)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <p className="capitalize text-xl tracking-tighter font-semibold">
          {data.guess}
        </p>
        <p className="font-medium text-sm tabular-nums text-zinc-500">
          Initial: {formatCurrency(data.initialPrice!)}
        </p>
      </div>

      <div className="flex justify-between w-full mt-1">
        <p
          className={clsx('capitalize tracking-tighter font-semibold', {
            'text-green-500': isCorrectGuess,
            'text-red-500': !isCorrectGuess,
          })}
        >
          {isUpWon || isDownWon ? 'won (+1)' : ''}
          {!isUpWon && !isDownWon ? 'lost (-1)' : ''}
        </p>
        <p className="font-medium text-sm tabular-nums text-black">
          Computed score: {data.score}
        </p>
      </div>
    </div>
  );
}
