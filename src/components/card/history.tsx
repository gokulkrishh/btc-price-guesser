import clsx from 'clsx';
import { CalendarIcon, TimeIcon } from 'components/icons';
import { DataItem } from 'types/data';
import { dateOptions, formatCurrency, formatDate, timeOptions } from 'utils';

type HistoryCardProps = {
  data: DataItem;
  className?: string;
};

export default function HistoryCard({
  data,
  className = '',
}: HistoryCardProps) {
  const isResolved = data.resolved;
  const isCorrectGuess = data.correct;
  const isUpWon = isResolved && isCorrectGuess && data.guess === 'up';
  const isDownWon = isResolved && isCorrectGuess && data.guess === 'down';

  return (
    <div
      className={clsx(
        'flex flex-col px-4 p-3 bg-zinc-50 border w-full rounded-xl',
        className,
      )}
    >
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
          {isResolved && data.resolvedPrice ? (
            <span>{formatCurrency(data.resolvedPrice)}</span>
          ) : (
            <span className="inline-flex w-28 animate-pulse h-5 bg-zinc-300/70 rounded-md" />
          )}
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <span className="capitalize text-xl tracking-tighter font-semibold">
          {data.guess}
        </span>
        <span className="font-medium text-sm tabular-nums text-zinc-500">
          Initial: {formatCurrency(data.initialPrice!)}
        </span>
      </div>

      <div className="flex justify-between w-full mt-1">
        <div className="capitalize flex gap-1 text-sm tracking-tight font-semibold">
          <span className="text-zinc-500">status: </span>
          <div
            className={clsx('flex items-center', {
              'text-green-500': isCorrectGuess,
              'text-red-500': isResolved && !isCorrectGuess,
              'text-zinc-500': !isResolved,
            })}
          >
            {isUpWon || isDownWon ? 'won (+1)' : ''}
            {isResolved && !isCorrectGuess ? 'lost (-1)' : ''}
            {!isResolved ? (
              <span className="inline-flex w-16 animate-pulse h-5 bg-zinc-300/70 rounded-md" />
            ) : null}
          </div>
        </div>
        <div className="font-medium flex items-center gap-1 text-sm tabular-nums text-black">
          Computed score: {!isResolved ? 'Nil' : data.score}
        </div>
      </div>
    </div>
  );
}
