import { DataItem } from 'types/data';
import { formatDate, timeOptions } from 'utils';

export default function HistoryCard({ data }: { data: DataItem }) {
  return (
    <div className="rounded-xl flex flex-col px-4 p-3 bg-zinc-50 border w-full">
      <p> Guess: {data.guess}</p>
      <p>Correct: {String(data.correct)}</p>
      <p>
        Date & Time: <span>{formatDate(data.createdAt)}</span>
        <span> &middot; </span>
        <span>{formatDate(data.createdAt, timeOptions)}</span>
      </p>
      <p>score: {data.score}</p>
      <p>initial price: {data.initialPrice}</p>
      <p>resolved price: {data.resolvedPrice ?? 'Nil'}</p>
    </div>
  );
}
