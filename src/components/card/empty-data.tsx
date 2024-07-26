import { HistoryIcon } from 'components/icons';

export default function EmptyDataState() {
  return (
    <div className="flex flex-col mt-10 h-40 justify-center items-center">
      <HistoryIcon className="w-10 h-10" />
      <h3 className="text-primary mt-3 tracking-wide font-medium">
        You haven't guessed yet!
      </h3>
      <p className="mt-1 text-sm text-zinc-600 text-center">
        Start guessing now.
      </p>
    </div>
  );
}
