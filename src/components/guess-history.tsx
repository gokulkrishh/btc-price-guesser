import { useData } from 'contexts/data';
import { DataItem } from 'types/data';
import HistoryCard from './card/history';
import HistoryCardSkeleton from './skeleton/history';
import EmptyDataState from './card/empty-data';

export default function GuessHistory() {
  const { data, isLoading } = useData();
  const isEmpty = !isLoading && data.length === 0;

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h3 className="font-bold text-lg text-zinc-700">
        History ({data.length})
      </h3>

      {isLoading ? (
        <HistoryCardSkeleton count={3} />
      ) : isEmpty ? (
        <EmptyDataState />
      ) : (
        data.map((datum: DataItem, index) => {
          return (
            <HistoryCard
              className={
                index === 0 && !datum.resolved
                  ? 'border-2 border-orange-400'
                  : ''
              }
              data={datum}
              key={datum.id}
            />
          );
        })
      )}
    </div>
  );
}
