import { useData } from 'contexts/data';
import { DataItem } from 'types/data';
import HistoryCard from './card/history';

export default function GuessHistory() {
  const { data, isLoading } = useData();
  const isEmpty = data.length === 0;

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h3 className="font-bold text-lg text-zinc-700">
        History ({data.length})
      </h3>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : isEmpty ? (
        <p className="text-center">Make a guess</p>
      ) : (
        data.reverse().map((datum: DataItem, index) => {
          return (
            <HistoryCard
              className={index === 0 ? 'border-2 border-orange-400' : ''}
              data={datum}
              key={datum.id}
            />
          );
        })
      )}
    </div>
  );
}
